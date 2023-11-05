
from django.urls import include, path
from . import views

urlpatterns = [
    path("home/", views.home),
    ##path("login/", views.login),
    path("signup/", views.signup),
    path('login/', views.user_login),
    
]
