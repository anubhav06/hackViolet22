from pyexpat import model
from attr import fields
from rest_framework.serializers import ModelSerializer
from user.models import UserInfo

#class MentorInfoSerializer(ModelSerializer):
#    class Meta:
#        model = MentorInfo
#        fields = '__all__'


class UserInfoSerializer(ModelSerializer):
    class Meta:
        model = UserInfo
        fields = '__all__'