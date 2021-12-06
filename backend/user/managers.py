from django.contrib.auth.models import BaseUserManager
from django.utils.translation import ugettext_lazy as _


class CustomUserManager(BaseUserManager):
    def create_superuser(self, email, username, password, **kwargs):
        kwargs.setdefault('is_admin', True)
        kwargs.setdefault('is_staff', True)
        kwargs.setdefault('is_superuser', True)
        kwargs.setdefault('is_active', True)

        if kwargs.get('is_admin') is not True:
            raise ValueError('is_admin must be set True for superuser')
        if kwargs.get('is_staff') is not True:
            raise ValueError('is_staff must be set True for superuser')
        if kwargs.get('is_superuser') is not True:
            raise ValueError('is_superuser must be set True for superuser')
        return self.create_user(email, username,  password, **kwargs)

    def create_user(self, email, username, password, **kwargs):
        return self._create_user(email, username,  password, **kwargs)

    def _create_user(self, email, username,  password, **kwargs):
        if not email:
            raise ValueError(_('Enter a valid email address'))
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            username=username,
            **kwargs
        )
        user.set_password(password)
        user.save()
        return user
