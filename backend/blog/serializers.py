from django.utils.translation import ugettext_lazy as _

from rest_framework import serializers

from .models import Blog, Category
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


class CategorySerializer(serializers.ModelSerializer):
    blog_posts = BlogSerializer(many=True)
    # blog_posts = serializers.StringRelatedField(many=True)

    class Meta:
        model = Category
        fields = '__all__'


class CategoryMutationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'

    def to_representation(self, value):
        if isinstance(value, Category):
            serializer = CategorySerializer(value)
        else:
            raise Exception('Unexpected type of tagged object')
        return serializer.data
