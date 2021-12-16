from django.urls import path
from django.urls.conf import include

from rest_framework import routers

from .views import (BlogViewSet, CategoryViewSet)


router = routers.SimpleRouter()
router.register(r'blogs', BlogViewSet)
router.register(r'categories', CategoryViewSet)

app_name = 'blog'

urlpatterns = [
    path('', include(router.urls)),
]
