from django.db import models
from django.conf import settings
from django.db.models.deletion import CASCADE
from django.contrib.auth.models import AbstractUser




class User(AbstractUser):
    def __str__(self):
        return self.username

class Tweet(models.Model):
    user = models.ForeignKey(User, on_delete=CASCADE, related_name="tweets")
    post_text = models.CharField(max_length = 280)
    likes = models.ManyToManyField(User, blank=True, related_name="likes")
    image = models.FileField(upload_to='images/', blank = True, null = True)
    pub_date = models.DateTimeField('date published')

    def _str_(self): 
        return self.post_text