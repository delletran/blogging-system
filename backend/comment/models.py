from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


from django.contrib.auth import get_user_model
import uuid

USER = get_user_model()
BLOG = 'blog.Blog'


class Comment(models.Model):
    content = models.TextField(_("comment content"))
    post_id = models.ForeignKey(BLOG, on_delete=models.CASCADE)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    author = models.ForeignKey(USER, verbose_name=_(
        "Comment author"), related_name='comment_author', blank=True, null=True, on_delete=models.CASCADE)
    up_votes = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(_("active comment"), default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['pk']
        verbose_name = _("Comment")
        verbose_name_plural = _("Comments")


class Reply(models.Model):
    content = models.CharField(max_length=120)
    post_id = models.ForeignKey(BLOG, on_delete=models.CASCADE)
    comment_id = models.ForeignKey(
        'Comment', blank=True, null=True, on_delete=models.CASCADE)
    reply_id = models.ForeignKey(
        'self', blank=True, null=True, on_delete=models.CASCADE)
    limit = models.Q(app_label='comment', model='comment') | \
        models.Q(app_label='comment', model='reply')
    reply_to = models.ForeignKey(
        ContentType,
        blank=True,
        null=True,
        limit_choices_to=limit,
        on_delete=models.CASCADE
    )
    object_id = models.PositiveIntegerField(
        null=True,
        blank=True,
        db_index=True
    )
    reply_type = GenericForeignKey('reply_to', 'object_id')
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    author = models.ForeignKey(USER, verbose_name=_(
        "Reply author"), related_name='reply_author', blank=True, null=True, on_delete=models.CASCADE)
    up_votes = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(_("active comment"), default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['pk']
        verbose_name = _("Reply")
        verbose_name_plural = _("Replies")
