from rest_framework.serializers import ModelSerializer
from forum.models import Post, Reply
from user.api.serializers import UserInfoSerializer

class ReplySerializer(ModelSerializer):

    poster = UserInfoSerializer(read_only=True)
    
    class Meta:
        model = Reply
        fields = ('id', 'poster', 'content', 'timestamp')


class PostSerializer(ModelSerializer):

    likedBy = UserInfoSerializer(read_only=True, many=True)
    poster = UserInfoSerializer(read_only=True)
    reply = ReplySerializer(read_only=True, many=True)

    class Meta:
        model = Post
        fields = ('id', 'poster', 'content', 'timestamp', 'likedBy', 'likes', 'reply')

