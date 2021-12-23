from django.contrib import auth
from django.utils.translation import ugettext_lazy as _

from rest_framework import serializers
import uuid

from user.serializers import UserSerializer
from .models import Comment, Reply


class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'

    def validate(self, data):
        print(self.context['request'])
        print(data)
        user = self.context['request'].user
        data['author'] = user
        return data


class ReplySerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Reply
        fields = '__all__'

    def validate(self, data):
        user = self.context['request'].user
        data['author'] = user
        return data

    # def validate(self, data):
    #     user = self.context['request'].user
    #     if data['author'] == None:
    #         data['author'] = user
    #     # else:
    #     #     author = data['author']
    #     #     if author != user:
    #     #         raise serializers.ValidationError(
    #     #             f"This comment can only be updated by author")
    #     return data
