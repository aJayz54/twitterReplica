from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import Tweet, User

class tweetAdmin(admin.ModelAdmin):
    list_display = ('post_text', 'image', 'pub_date')

class userAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    list_display = ['email', 'username']

admin.site.register(Tweet,tweetAdmin)
admin.site.register(User, userAdmin)