import json
from django.shortcuts import render,redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.contrib import messages
from game.models import User_Skill
from .forms import SkillForm, Skill

def main_page(request): 
    save_data_dict = {}
    user = request.user
    if user.is_authenticated:
        #create User_Skill data
        all_skills = Skill.objects.all()
        for skill in all_skills:
            # Retrieve or create a User_Skill instance for the user and skill
            user_skill, created = User_Skill.objects.get_or_create(username=user, skill_name=skill)
            
            if created:
                print(f"Data for user {user.username} and skill '{skill.skill_name}' created successfully.")
            else:
                print(f"Data for user {user.username} and skill '{skill.skill_name}' already exists.")

        skill_level = User_Skill.objects.filter(username=user.id)
        for i in skill_level:
            save_data_dict[i.skill_name.skill_name] = i.level
        data = json.dumps(save_data_dict)

       
        return render(request, 'Main.html', {"loaded_data": data, "username": user})
    else:
        return render(request, "auth_app/login.html")




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
                
                #save SKILL for logged in user
                all_skills = Skill.objects.all()
                for skill in all_skills:
                    skill_level = "level_"+ skill.skill_name
                    level = data.get(skill_level)
                    # Extract other fields
                    
                    # Save the data to the database using YourModel
                    user_skill = get_object_or_404(User_Skill, username = username, skill_name = skill)
                    user_skill.level = level
                    user_skill.save()
                    print(f"save for skill {skill.skill_name} successfully.")
                return JsonResponse({'status': 'success'})
            except Exception as e:
                print("Saved failed.")
                return JsonResponse({'status': 'failed', 'error': str(e)})

    return JsonResponse({'status': 'failed'})