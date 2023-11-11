import json
from django.shortcuts import render,redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.contrib import messages
from game.models import User_Skill
from .forms import SkillForm

def main_page(request): 
    return render(request, 'index.html')




def add_skill(request):
    if request.method == 'POST':
        form = SkillForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('success')  # Redirect to a success page or another view
    else:
        form = SkillForm()

    return render(request, 'add_skill.html', {'form': form})

def save_data(request):
    if request.method == 'POST':
        username = None

        if request.user.is_authenticated:
            username = request.user.id
            try:
                # Process the data and save it to the database
                data = json.loads(request.body)    # Get the data sent from the JavaScript
                skill_name = data.get('skill_name')
                level = data.get('level')
                # Extract other fields
                print(username)
                print(data)
                print(skill_name)
                print(level)
                user_skill = get_object_or_404(User_Skill, username = username, skill_name = skill_name)
                user_skill.level = level
                user_skill.save()
                print("Data created successfully.")
                # Save the data to the database using YourModel

                return JsonResponse({'status': 'success'})
            except Exception as e:
                print("Data created failed.")
                return JsonResponse({'status': 'failed', 'error': str(e)})

    return JsonResponse({'status': 'failed'})