from django.db import models
from django.db.models.base import Model
from django.utils import timezone
from django.urls import reverse
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin
)
from django.utils.translation import ugettext_lazy as _
from django.dispatch import receiver
from django.db.models.signals import post_save


from .managers import CustomUserManager


class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=60, unique=True)
    email = models.EmailField(_('email address'), max_length=60, unique=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(
        auto_now_add=False, auto_now=False, default=timezone.now)
    update_at = models.DateTimeField(auto_now_add=True)

    objects = CustomUserManager()

    USERNAME_FIELD = ('email')
    REQUIRED_FIELDS = ['username', 'password']

    class Meta:
        ordering = ['-pk', 'username']
        db_table = 'db_user'
        managed = True
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return self.username


class UserProfile(models.Model):
    user = models.ForeignKey("CustomUser", verbose_name=_(
        "profile"), on_delete=models.CASCADE)
    first_name = models.CharField(max_length=60, blank=True, null=True)
    last_name = models.CharField(max_length=60, blank=True, null=True)
    avatar = models.ImageField(
        upload_to='images/', null=True, blank=True)
# 'images/%Y/%m/%d'

    class Meta:
        ordering = ['-pk']
        verbose_name = _("UserProfile")
        verbose_name_plural = _("UserProfiles")

    def get_fullname(self):
        return f'{self.first_name} {self.last_name}'

    def __str__(self):
        return self.get_fullname()

    # def get_absolute_url(self):
    #     return reverse("UserProfile_detail", kwargs={"pk": self.pk})


@receiver(post_save, sender=CustomUser)
def post_save_project(sender, instance, created, *args, **kwargs):
    if created:
        profile = UserProfile(
            user=instance,
        )
        profile.save()
