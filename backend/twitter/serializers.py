from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from .models import User
from .models import Tweet

class twitterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields = ('id', 'user', 'post_text', 'likes', 'image', 'pub_date')


class userSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')