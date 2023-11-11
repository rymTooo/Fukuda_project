
from django.urls import include, path
from . import views

urlpatterns = [
    path("home/", views.home),
    path("signup/", views.signup),
    path('login/', views.login_user),
    path("logout/", views.logout_user),
    path('showDB/', views.user_list), #EX for display data from database
    
]
