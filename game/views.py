from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from auth_app.forms import LoginForm, SignupForm
from django.contrib.auth import authenticate, login
from django.contrib import messages


def main_page(request): 
    return render(request, 'index.html')