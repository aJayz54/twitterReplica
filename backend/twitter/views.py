from django.shortcuts import render
from rest_framework import viewsets
from .serializers import twitterSerializer, userSerializer
from .models import Tweet, User

class twitterView(viewsets.ModelViewSet):
    serializer_class = twitterSerializer
    queryset = Tweet.objects.all()

class userView(viewsets.ModelViewSet):
    serializer_class = userSerializer
    queryset = User.objects.all()