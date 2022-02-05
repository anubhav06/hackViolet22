from rest_framework.serializers import ModelSerializer
from jobPortal.models import Job
from mentorship.models import MeetingInfo

class JobSerializer(ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'


class MeetingInfoSerializer(ModelSerializer):
    class Meta:
        model = MeetingInfo
        fields = '__all__'

