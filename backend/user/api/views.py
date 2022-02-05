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
    
    # Input validation. Check if all data is provided
    if not email or not username or not password or not confirmation:
        return Response('All data is required')


    # Attempt to create new user
    try:
        user = User.objects.create_user(username, email, password)
        user.save()
    except IntegrityError:
        return Response("ERROR: Email already taken", status=status.HTTP_406_NOT_ACCEPTABLE)

    # Add it to the company groups
    group = Group.objects.get(name='Company') 
    group.user_set.add(user)

    return Response('Registered Successfully ✅')




# ------------------------------------
@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
        '/api/register-user',
    ]

    return Response(routes)



