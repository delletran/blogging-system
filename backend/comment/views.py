
from rest_framework import viewsets, filters

from rest_framework.decorators import (
    action,
)

from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import CommentSerializer, ReplySerializer
from .models import Comment, Reply


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    filter_backends = [DjangoFilterBackend,
                       filters.OrderingFilter]
    filterset_fields = ['post_id', 'is_active']
    ordering_fields = '__all__'

    @action(methods=['GET'], detail=False)
    def get_queryset(self):
        queryset = self.queryset
        if isinstance(queryset, Comment):
            queryset = queryset.all()
        if self.request.user.is_admin == False:
            queryset = queryset.filter(is_active=True)
        return queryset


class ReplyViewSet(viewsets.ModelViewSet):
    queryset = Reply.objects.all()
    serializer_class = ReplySerializer
    filter_backends = [DjangoFilterBackend,
                       filters.OrderingFilter]
    filterset_fields = ['post_id', 'comment_id',
                        'object_id', 'reply_to', 'is_active']
    ordering_fields = '__all__'
