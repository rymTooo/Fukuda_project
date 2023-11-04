from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def login ():
    return 0

def home(requests):
    return render(requests, 'auth_app/home.html')

def signup ():
    return 1