from tracemalloc import start
from django.core.exceptions import ObjectDoesNotExist
from django.db import IntegrityError
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import Group

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth.models import User
from user.api.serializers import UserInfoSerializer
from user.models import UserInfo




# For customizing the token claims: (whatever value we want)
# Refer here for more details: https://django-rest-framework-simplejwt.readthedocs.io/en/latest/customizing_token_claims.html

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        
        if user.groups.filter(name="Mentor").exists():
            token['group'] = "Mentor"
        elif user.groups.filter(name="Company").exists():
            token['group'] = "Company"
        else:
            token['group'] = "None"
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# User registration logic
@api_view(['GET', 'POST'])
def registerUser(request):
    username = request.data["email"]
    email = request.data["email"]

    # Ensure password matches confirmation
    password = request.data["password"]
    confirmation = request.data["confirmPassword"]
    if password != confirmation:
        return Response("ERROR: Passwords don't match", status=status.HTTP_406_NOT_ACCEPTABLE)
    
    # Input validation. Check if all data is provided
    if not email or not username or not password or not confirmation:
        return Response('All data is required')


    # Attempt to create new user
    try:
        user = User.objects.create_user(username, email, password)
        user.save()
    except IntegrityError:
        return Response("ERROR: Email already taken", status=status.HTTP_406_NOT_ACCEPTABLE)

    mentor = request.data["mentor"]
    if mentor == True:
        # Add it to the Mentor groups
        group = Group.objects.get(name='Mentor') 
        group.user_set.add(user)

        data = UserInfo(mentor=True, user=user)
        data.save()

    data = UserInfo(mentor=False ,user=user)
    data.save()

    return Response('Registered Successfully ✅')




# Company registration logic
@api_view(['GET', 'POST'])
def registerCompany(request):
    username = request.data["email"]
    email = request.data["email"]

    # Ensure password matches confirmation
    password = request.data["password"]
    confirmation = request.data["confirmPassword"]
    if password != confirmation:
        return Response("ERROR: Passwords don't match", status=status.HTTP_406_NOT_ACCEPTABLE)

    company = request.data['company']
    website = request.data['website']

    # Input validation. Check if all data is provided
    if not email or not username or not password or not confirmation or not company or not website:
        return Response('All data is required')


    # Attempt to create new user
    try:
        user = User.objects.create_user(username, email, password, first_name=company, last_name=website)
        user.save()
    except IntegrityError:
        return Response("ERROR: Email already taken", status=status.HTTP_406_NOT_ACCEPTABLE)

    # Add it to the company groups
    group = Group.objects.get(name='Company') 
    group.user_set.add(user)

    return Response('Registered Successfully ✅')


# To add a user's information
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addInfo(request):

    name = request.data['name']
    bio = request.data['bio']
    image = request.data['image']
    startTime = request.data['startTime']
    endTime = request.data['endTime']
    timeZone = request.data['timeZone']

    # If the user is a mentor
    if request.user.groups.filter(name='Mentor').exists():
        userInfo = UserInfo.objects.get(user=request.user)
        userInfo.name = name
        userInfo.bio = bio
        userInfo.image = image
        userInfo.startTime = startTime
        userInfo.endTime = endTime
        userInfo.timeZone = timeZone
        userInfo.save()
    else:
        userInfo = UserInfo.objects.get(user=request.user)
        userInfo.name = name
        userInfo.bio = bio
        userInfo.image = image
        userInfo.save()

    return Response('Data added')


# Get the information of the requested user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getInfo(request):

    info = UserInfo.objects.filter(user=request.user)
    serialzier = UserInfoSerializer(info, many=True)
    return Response(serialzier.data)    


# ------------------------------------
@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
        '/api/register-user',
    ]

    return Response(routes)



