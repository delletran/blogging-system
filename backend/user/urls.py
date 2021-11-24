from django.urls import path
from django.urls.conf import include

from rest_framework import routers

from .views import UserViewSet


router = routers.SimpleRouter()
router.register(r'users', UserViewSet)

app_name = 'user'

urlpatterns = [
    path('', include(router.urls)),
]
