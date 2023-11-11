from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from auth_app.forms import LoginForm, SignupForm
from django.contrib.auth import authenticate, login
from django.contrib import messages
from .models import User_Skill,Skill


def main_page(request): 
    level_dict = {}
    user = request.user
    skill_level = User_Skill.objects.filter(username=user.id)
    
    for i in skill_level:
        level_dict[i.skill_name.skill_name] = i.level

    return render(request, 'index.html', {"lvdata": level_dict})