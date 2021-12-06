from django.urls import path
from django.urls.conf import include

from rest_framework import routers

from .views import (
    UserViewSet,
    UserProfileViewSet,
    user_owner_details_view,
    CustomTokenObtainPairView,
    CustomTokenRefreshView
)


router = routers.SimpleRouter()
router.register(r'users', UserViewSet)
router.register(r'user-profiles', UserProfileViewSet)

app_name = 'user'

urlpatterns = [
    path('auth/', user_owner_details_view, name='user-details'),
    path('', include(router.urls)),
    path('token/', CustomTokenObtainPairView.as_view(),
         name='custom_token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(),
         name='custom_token_refresh'),
]
