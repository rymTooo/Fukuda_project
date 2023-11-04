from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.contrib.auth.models import User

# Create your views here.
def login (request):
    
    return render(request, "auth_app/login.html")

def home(request):
    return render(request, 'auth_app/home.html')

def signup (request):



    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        email = request.POST['email']
        user = User.objects.create_user(username, email, password)
        user.save()
        return redirect("/login")
    return render(request , "auth_app/signup.html")