from django.contrib.auth.models import User
from django.db import models

class MentorInfo(models.Model):
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='mentor')
    bio = models.CharField(max_length=100)
    name = models.CharField(max_length=32)
    startTime = models.TimeField(null=True, default=None)
    endTime = models.TimeField(null=True, default=None)
    timeZone = models.CharField(max_length=5)

    def __str__(self):
        return f"{self.user}'s info : {self.name}"




