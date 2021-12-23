from django.urls import path
from django.urls.conf import include

from rest_framework import routers

from .views import (CommentViewSet, ReplyViewSet)


router = routers.SimpleRouter()
router.register(r'comments', CommentViewSet)
router.register(r'replies', ReplyViewSet)

app_name = 'comments'

urlpatterns = [
    path('', include(router.urls)),
]
