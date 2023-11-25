from django.shortcuts import render
from django.urls import path,include
from . import views


urlpatterns = [
    path('main/', views.main_page),
    # path('add_skill/', views.add_skill),
    path('save-data/',views.save_data),
    path('test/',views.test_method),
    path('data/',views.data),
]