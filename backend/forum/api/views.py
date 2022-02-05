from django.db import IntegrityError
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import Group
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from django.contrib.auth.models import User
from forum.models import Reply
from user.models import UserInfo

from forum.models import Post
from .serializers import PostSerializer

# To add a new post
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addPost(request):

    content = request.data['content']
    
    userInfo = UserInfo.objects.get(user=request.user)
    post = Post(poster=userInfo, content=content)
    post.save()

    return Response('Post added')


# To get all the posts 
@api_view(['GET'])
def getPosts(request):

    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)
    #return Response([post.serializer() for post in posts])


# To add a comment
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addComment(request):

    content = request.data['content']
    postID = request.data['postID']

    post = Post.objects.get(id=postID)
    userInfo = UserInfo.objects.get(user=request.user)

    reply = Reply(poster=userInfo, content=content)
    reply.save()
    post.reply.add(Reply.objects.get(id=reply.id))

    return Response('Comment added')
    

# To perform like/unlike operations
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like(request, id):

    try:
        userInfo = UserInfo.objects.get(user=request.user)
        likeOpn = Post.objects.filter(id=id,  likedBy__in = [userInfo]).first()
    except IntegrityError:
        likeOpn = None

    post = Post.objects.get(id=id)
    userInfo = UserInfo.objects.get(user=request.user)
    
    # If it's not liked
    if likeOpn is None:
        post.likedBy.add(userInfo)
        post.likes = int(post.likes) + 1
        post.save()
        return Response('Liked')
    else:
        post.likedBy.remove(userInfo)
        post.likes = int(post.likes) - 1
        post.save()
        return Response('Unliked')





# ------------------------------------
@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/job-portal/add',
    ]

    return Response(routes)



