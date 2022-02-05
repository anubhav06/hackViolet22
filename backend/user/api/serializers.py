from rest_framework.serializers import ModelSerializer
from user.models import MentorInfo

class MentorInfoSerializer(ModelSerializer):
    class Meta:
        model = MentorInfo
        fields = '__all__'