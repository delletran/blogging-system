from django.urls import path
from django.urls.conf import include

from rest_framework import routers

from .views import (BlogViewSet)


router = routers.SimpleRouter()
router.register(r'blogs', BlogViewSet)

app_name = 'blog'

urlpatterns = [
    path('', include(router.urls)),
]
