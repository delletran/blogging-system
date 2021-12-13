from django.utils.translation import ugettext_lazy as _

from rest_framework import serializers
from rest_framework.fields import ReadOnlyField

from .models import Blog
from user.serializers import UserSerializer


class BlogSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Blog
        fields = '__all__'

    def validate(self, data):
        title = data['title']
        user = self.context['request'].user
        blog_exist = Blog.objects.all().filter(
            title=title,
            author=user
        ).exists()
        data['author'] = user
        if blog_exist and self.context['request'].method == 'POST':
            raise serializers.ValidationError(
                f"{user} has already created a blog with this title.")
        return data
