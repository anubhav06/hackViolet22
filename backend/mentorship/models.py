from django.db import models
from django.contrib.auth.models import User
from user.models import UserInfo


class MeetingInfo(models.Model):

    accepeted = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')
    mentor = models.ForeignKey(UserInfo, on_delete=models.CASCADE, related_name='meetingMentor')
    startTime = models.TimeField()
    endTime = models.TimeField()
    meetingLink = models.CharField(max_length=100, null=True, default=None)

    def __str__(self):
        return f"{self.accepeted} - {self.mentor} - {self.user}"

    def serializer(self):
        return {
            "id": self.id,
            "accepted": self.accepeted,
            "user": self.user.id,
            "startTime": self.startTime,
            "endTime": self.endTime,
            "meetingLink": self.meetingLink,
            "mentor":{
                "name" : self.mentor.name,
                "bio" : self.mentor.bio,
                "timeZone" : self.mentor.timeZone,
                "image" : self.mentor.image,
            }
        }
