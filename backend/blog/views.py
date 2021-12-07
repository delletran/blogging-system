
from rest_framework import viewsets

from .serializers import (
    BlogSerializer,
)

from .models import Blog


class UserViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    # lookup_field = 'slug'
