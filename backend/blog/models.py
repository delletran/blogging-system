from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _

from django.contrib.auth import get_user_model
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.utils.text import slugify
from django.utils.crypto import get_random_string

from ckeditor.fields import RichTextField

USER = get_user_model()


class Blog(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField(
        _("blog description"), blank=True, null=True)
    body = RichTextField(blank=True, null=True)
    slug = models.SlugField(_("slug"), blank=True, null=True)
    author = models.ForeignKey(USER, verbose_name=_(
        "Blog Author"), blank=True, null=True, on_delete=models.CASCADE)
    categories = models.ManyToManyField(
        "Category", blank=True,  verbose_name=_("Categories"))
    published_at = models.DateTimeField(
        auto_now_add=False, auto_now=False, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=False, auto_now=True)
    update_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        _suffix = str(self.author.id) + \
            (get_random_string(3, '0123456789'))
        slug_suffix = (urlsafe_base64_encode(force_bytes(_suffix)))
        self.slug = slugify(f'{self.title}-{slug_suffix}')
        super(Blog, self).save(*args, **kwargs)

    class Meta:
        ordering = ['-pk']
        verbose_name = _("Blog")
        verbose_name_plural = _("Blogs")

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("Blog_detail", kwargs={"pk": self.pk})


class Tag(models.Model):
    name = models.CharField(max_length=50)
    blog = models.ForeignKey("Blog", verbose_name=_(
        "Blog"), blank=True, null=True, on_delete=models.CASCADE)

    class Meta:
        verbose_name = _("Tag")
        verbose_name_plural = _("Tags")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Tag_detail", kwargs={"pk": self.pk})


class Category(models.Model):
    name = models.CharField(max_length=120)
    description = models.TextField(
        _("Category description"), blank=True, null=True)
    is_active = models.BooleanField(_("Active category"), default=True)
    blog_posts = models.ManyToManyField(
        "Blog", related_name='blog_posts', blank=True)

    class Meta:
        verbose_name = _("Category")
        verbose_name_plural = _("Categories")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Category_detail", kwargs={"pk": self.pk})
