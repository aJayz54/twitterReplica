from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from twitter import views

router = routers.DefaultRouter()
router.register(r'tweets', views.twitterView, 'twitter')
router.register(r'users', views.userView, 'twitter')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/v1/users/', include('twitter.urls')),
]
