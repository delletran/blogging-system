from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _

from django.contrib.auth import get_user_model

USER = get_user_model()


class Comment(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField(
        _("blog description"), blank=True, null=True)
    author = models.ForeignKey(USER, verbose_name=_(
        "Comment author"), blank=True, null=True, on_delete=models.CASCADE)
    is_active = models.BooleanField(_("active comment"), default=True)
    created_at = models.DateTimeField(auto_now_add=False, auto_now=True)
    update_at = models.DateTimeField(auto_now_add=True)
