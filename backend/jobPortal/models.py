from django.db import models
from django.contrib.auth.models import User


# Job Model
class Job(models.Model):
    
    name = models.CharField(max_length=32)
    description = models.CharField(max_length=200)
    location = models.CharField(max_length=50)
    website = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now=True)
    poster = models.ForeignKey(User, on_delete=models.CASCADE, related_name='jobPoster')

    def __str__(self):
        return f"{self.poster} added JOB: {self.name}"