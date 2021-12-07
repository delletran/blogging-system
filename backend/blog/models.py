from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _

class Blog(models.Model):
    title = models.CharField( max_length=50)
    description = models.TextField(_("blog description"))
    body = models.TextField(_("blog body <replace with m2m field>"))
    slug = models.SlugField(_("slug"))
    created_at = models.DateTimeField(auto_now_add=False, auto_now=True)
    update_at = models.DateTimeField(auto_now_add=True)

    

    class Meta:
        verbose_name = _("Blog")
        verbose_name_plural = _("Blogs")

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Blog_detail", kwargs={"pk": self.pk})
