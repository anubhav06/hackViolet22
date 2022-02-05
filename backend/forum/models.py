from pyexpat import model
from django.db import models
from django.contrib.auth.models import User
from user.models import UserInfo


# Reply to a post
class Reply(models.Model):

    poster = models.ForeignKey(UserInfo, on_delete=models.CASCADE, related_name='replyPoster')
    content = models.CharField(max_length=1000)
    timestamp = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.poster}'s reply to {self.content}"


class Post(models.Model):

    poster = models.ForeignKey(UserInfo, on_delete=models.CASCADE, related_name='poster')
    content = models.CharField(max_length=1000)
    timestamp = models.DateTimeField(auto_now=True)
    likedBy = models.ManyToManyField(UserInfo)
    likes = models.IntegerField(default=0)
    reply = models.ManyToManyField(Reply)

    def __str__(self):
        return f"{self.poster}"



