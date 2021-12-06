from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model

from rest_framework import viewsets
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes
)
from rest_framework.decorators import api_view
from rest_framework.decorators import parser_classes
from rest_framework.parsers import JSONParser, FileUploadParser, FormParser

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status


from .serializers import (
    UserSerializer,
    UserProfileSerializer,
    ObtainTokenPairSerializer,
    ObtainTokenRefreshSerializer
)
from .models import UserProfile
User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'username'


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    # parser_classes = [JSONParser, FormParser, FileUploadParser]
    lookup_field = 'user'


@api_view(['POST'])
@parser_classes([JSONParser])
def update_avatar_view(request, format=None):
    """
    A view that can accept POST requests with JSON content.
    """
    return Response({'received data': request.data})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication, SessionAuthentication])
def user_owner_details_view(request,  *args, **kwargs):
    profile = get_object_or_404(User, id=request.user.id)
    serializer = UserSerializer(profile)
    return Response(serializer.data, status=status.HTTP_200_OK)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = ObtainTokenPairSerializer


class CustomTokenRefreshView(TokenRefreshView):
    serializer_class = ObtainTokenRefreshSerializer
