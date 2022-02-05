from math import perm
from tkinter.tix import Tree
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import Group
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from django.contrib.auth.models import User
from mentorship.models import MeetingInfo
from user.api.serializers import UserInfoSerializer
from user.models import UserInfo
from mentorship.api.serializers import MeetingInfoSerializer

import string
import random

# Download the helper library from https://www.twilio.com/docs/python/install
from decouple import config
from twilio.rest import Client
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import VideoGrant
from twilio.jwt.access_token.grants import ChatGrant
from twilio.base.exceptions import TwilioRestException



# Required for all Twilio Access Tokens
# To set up environmental variables, see http://twil.io/secure
account_sid = config('TWILIO_ACCOUNT_SID')
api_key = config('TWILIO_API_KEY')
api_secret = config('TWILIO_API_KEY_SECRET')
#twilio_client = Client(api_key, api_secret,
                    #   account_sid)



@api_view(['GET'])
def getMentors(request):   

    mentors = UserInfo.objects.filter(mentor=True)
    #mentors = MentorInfo.objects.all()
    serializer = UserInfoSerializer(mentors, many=True)

    return Response(serializer.data)

# For a user to schedule a meet
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def scheduleMeet(request):

    mentorID = request.data['mentor']
    mentor = UserInfo.objects.get(id=mentorID)

    getTime = request.data['time']
    startTime = str(str(getTime)+':00')
    endTime = str(str(int(getTime) + 1) + ':00')

    data = MeetingInfo(user=request.user, mentor=mentor, startTime=startTime, endTime=endTime)
    data.save()

    return Response({'Sent a request to mentor informing about the meet ✅'})


# To get the scheduled meetings of the user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMeetings(request):

    meetings = MeetingInfo.objects.filter(user=request.user)
    return Response([meeting.serializer() for meeting in meetings])



# To get the scheduled/requested meetings of the mentor
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMentorMeetings(request):
    
    mentor = UserInfo.objects.get(user=request.user)
    meetings = MeetingInfo.objects.filter(mentor=mentor)

    return Response([meeting.serializer() for meeting in meetings])



# For a mentor to confirm a meeting
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def confirmMeeting(request, id):
    
    data = MeetingInfo.objects.get(id=id)
    data.accepeted = True
    # Generate a random meeting code
    roomCode = ''.join(random.choices(string.ascii_uppercase, k=10))

    data.meetingLink = str( config('TWILIO_APP_HOST') + '/room/' + roomCode )
    data.save()

    return Response('Meeting Confirmed ✅')



# For TWILIO meeting
@api_view(['POST'])
def twilioToken(request):
    identity = request.data["user_identity"]
    
    # required for Video grant
    # Create Access Token with credentials
    token = AccessToken(account_sid, api_key, api_secret, identity=identity)

    roomCode = request.data["room_name"]
    print('Room Name: ', roomCode)

    # Create a Video grant and add to token
    video_grant = VideoGrant(room=str(roomCode))
    token.add_grant(video_grant)

    token = str(token.to_jwt())

    return Response(token)


# ------------------------------------
@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/mentorship/',
    ]

    return Response(routes)



