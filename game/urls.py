from django.shortcuts import render
from django.urls import path,include
from . import views


urlpatterns = [
    path('main/', views.main_page),
]