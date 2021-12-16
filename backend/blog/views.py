
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, filters, status
import django_filters
import math

from rest_framework.decorators import (
    api_view, action,
    permission_classes,
    authentication_classes
)
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import (
    BlogSerializer, CategorySerializer, CategoryMutationSerializer
)

from .models import Blog, Category


class BlogPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 1000

    def get_paginated_response(self, data):
        return Response({
            # 'next': self.get_next_link(),
            # 'previous': self.get_previous_link(),
            'next_page':   int(self.request.query_params.get('page', 1))+1 if self.page.has_next() else None,
            'previous_page':   int(self.request.query_params.get('page', 1))-1 if self.page.has_previous() else None,
            'current_page': int(self.request.query_params.get('page', 1)),
            'total_data': self.page.paginator.count,
            # 'per_page': self.page_size,
            'total_pages': math.ceil(self.page.paginator.count/self.page_size),
            'results': data,
        })


class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    lookup_field = 'slug'
    pagination_class = BlogPagination
    filter_backends = [DjangoFilterBackend,
                       filters.OrderingFilter, filters.SearchFilter]
    # filterset_class = BlogFilter
    filterset_fields = {'slug': ['in'], 'published_at': ['lt']}
    search_fields = ['title', 'description']
    ordering_fields = '__all__'

    # @action(methods=['GET'], detail=False)

    @action(methods=['GET'], detail=False)
    def get_queryset(self):
        queryset = self.queryset
        if isinstance(queryset, Blog):
            queryset = queryset.all()
        if self.request.user.is_admin == False:
            queryset = queryset.filter(is_active=True)
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class CategoryPagination(PageNumberPagination):
    page_size = 30
    page_size_query_param = 'page_size'
    max_page_size = 1000


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategoryMutationSerializer
    lookup_field = 'slug'
    # pagination_class = CategoryPagination
    filter_backends = [DjangoFilterBackend,
                       filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = ['slug', 'is_active']
    search_fields = ['name', 'description']
    ordering_fields = '__all__'

    @action(methods=['GET'], detail=False)
    def get_queryset(self):
        queryset = self.queryset
        if isinstance(queryset, Category):
            queryset = queryset.all()
        if self.request.user.is_admin == False:
            queryset = queryset.filter(is_active=True)
        return queryset

    # def list(self, request, *args, **kwargs):
    #     queryset = self.filter_queryset(self.get_queryset())
    #     page = self.paginate_queryset(queryset)
    #     if page is not None:
    #         serializer = self.get_serializer(page, many=True)
    #         return self.get_paginated_response(serializer.data)
    #     serializer = self.get_serializer(queryset, many=True)
    #     return Response(serializer.data)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# @authentication_classes([JWTAuthentication, SessionAuthentication])
# def by_category_view(request, name, *args, **kwargs):
#     category = get_object_or_404(Category, name=name)
#     serializer = CategorySerializer(category)
#     return Response(serializer.data, status=status.HTTP_200_OK)
