from django.utils.translation import ugettext_lazy as _

from rest_framework import serializers

from .models import Blog


class BlogSerializer(serializers.ModelSerializer):

    class Meta:
        model = Blog
        fields = '__all__'
