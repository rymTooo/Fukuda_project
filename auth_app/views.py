from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from auth_app.forms import LoginForm, SignupForm
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages


# Create your views here.

def user_list(request): #Ex. for pull data from database (Show in home.html)
    users = User.objects.all()  # Retrieve all books from the database
    return render(request, 'auth_app/EX_display_from_database.html', {'users': users})

def home(request):
    current_user = request.user

    # Check if the user is authenticated
    if request.user.is_authenticated:
        # Perform actions for authenticated user
        # Access user attributes like username, email, etc.
        username = current_user.username
        email = current_user.email
    return render(request, 'auth_app/home.html',{'current_user': current_user})

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

def login_user(request):
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
                return redirect('/game/main')  # go to game main page
            else:
                # Handle invalid login
                return render(request, "auth_app/login.html", {'form': form, 'invalid_creds': True})
                
    else:
        form = LoginForm()
        
    return render(request, "auth_app/login.html", {'form': form})
def logout_user(request):
    logout(request)
    return render(request, "auth_app/home.html")
