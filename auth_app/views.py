from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from auth_app.forms import LoginForm, SignupForm
from django.contrib.auth import authenticate, login
from django.contrib import messages


# Create your views here.

# Login  
# def login (request):
    
#     return render(request, "auth_app/login.html")

def home(request):
    return render(request, 'auth_app/home.html')

def signup (request):

    ##if request.method == "POST":
        ##username = request.POST['username']
        ##password = request.POST['password']
        ##email = request.POST['email']
        ##user = User.objects.create_user(username, email, password)
        ##user.save()
        ##return redirect("/login")
    ##return render(request , "auth_app/signup.html")

    if request.method == "POST":
        form = SignupForm(request.POST)
        if form.is_valid():
            form.save()
            messages.info(request, f"You are now in LOGIN.")
        return redirect("/authorization/login")
    return render(request , "auth_app/signup.html")

def user_login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(username=username, password=password)
            messages.info(request, f"You are now SUBMIT LOGIN.")
            if user is not None:
                login(request, user)
                print("User authenticated:", user)
                # Redirect to a success page or home page
                return redirect('/authorization/home')  # Change 'home' to the name of your homepage URL
            else:
                # Handle invalid login
                return render(request, "auth_app/login.html", {'form': form, 'invalid_creds': True})
                print("User authenticated:", user)
    else:
        form = LoginForm()
        
    return render(request, "auth_app/login.html", {'form': form})

