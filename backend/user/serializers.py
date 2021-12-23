from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.utils import tree
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import update_last_login

from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer,
    TokenRefreshSerializer,
    api_settings,
    RefreshToken
)
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import UserProfile
User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'password2',
                  'email', 'is_admin']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            is_active=True,
            is_admin=False
        )
        user.set_password(validated_data['password'])
        user.save()

        return user


class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = '__all__'


class ObtainTokenPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        # print(User.objects.get(user=self.user))
        print(self.user.is_admin)
        data = {
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'id': self.user.id,
            'username': self.user.username,
            'email': self.user.email,
            'is_admin': self.user.is_admin
        }
        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)
        return data


class ObtainTokenRefreshSerializer(TokenRefreshSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = RefreshToken(attrs['refresh'])
        data = {
            'access': str(refresh.access_token),
        }
        if api_settings.ROTATE_REFRESH_TOKENS:
            if api_settings.BLACKLIST_AFTER_ROTATION:
                try:
                    refresh.blacklist()
                except AttributeError:
                    pass
            refresh.set_jti()
            refresh.set_exp()
            data['refresh'] = str(refresh)

        return data
