import json
from django.shortcuts import render,redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.contrib import messages
from game.models import Event, FukudaCustomization, PowerUp, Setting, Stat, User_Event, User_PowerUp, User_Skill,Skill
#from .forms import Skill

def main_page(request): 
    
    
    user = request.user
    if user.is_authenticated:
        print(f"\n--------------------------------\nCREATING data for user '{user.username}'\n")
        #create User_Skill data
        all_skills = Skill.objects.all()
        for skill in all_skills:
            # Retrieve or create a User_Skill instance for the user and skill
            user_skill, user_skill_created = User_Skill.objects.get_or_create(user=user, skill_name=skill)
            
            if user_skill_created:
                print(f"USER_SKILL, skill '{skill.skill_name}' created SUCCESSFUL.")
            else:
                print(f"USER_SKILL, skill '{skill.skill_name}' already exists.")
        #create Stat
        stat, stat_created = Stat.objects.get_or_create(user = user,all_time_money = 0, passiveincome = 0,current_money = 0, money_per_click = 0, click_counter = 0)
        if stat_created:
            print(f"STAT created SUCCESSFUL.")
        else:
            print(f"STAT already EXISTS.")
        #create Setting
        setting, setting_created = Setting.objects.get_or_create(user = user, theme = "defaut", sound_volumn = 50.0, notification = True)
        if setting_created:
            print(f"SETTING created SUCCESSFUL.")
        else:
            print(f"SETTING already EXISTS.")
        #create FukudaCustomization
        custom, custom_created = FukudaCustomization.objects.get_or_create(user = user, Head = "defaut",pant= "defaut",torso= "defaut",shoes= "defaut")
        if custom_created:
            print(f"FukudaCustomization created SUCCESSFUL.")
        else:
            print(f"FukudaCustomization already EXISTS.")
        #create USER_EVENT
        all_events = Event.objects.all()
        for event in all_events:
            # Retrieve or create a User_Skill instance for the user and skill
            user_event, user_event_created = User_Event.objects.get_or_create(user=user, event_name=event)
            
            if user_event_created:
                print(f"USER_EVENT, event '{event.event_name}' created SUCCESSFUL.")
            else:
                print(f"USER_EVENT, event '{event.event_name}' already exists.")
        #create USER_POWERUP
        all_powerups = PowerUp.objects.all()
        for powerup in all_powerups:
            # Retrieve or create a User_Skill instance for the user and skill
            user_powerup, user_powerup_created = User_PowerUp.objects.get_or_create(user=user, powerup_name=powerup)
            
            if user_powerup_created:
                print(f"USER_POWERUP, powerup '{powerup.powerup_name}' created SUCCESSFUL.")
            else:
                print(f"USER_POWERUP, powerup '{powerup.powerup_name}' already exists.")
        print("--------------------------------\n")
        
       
        return render(request, 'Main.html', {"username": user})
    else:
        return render(request, "auth_app/login.html")

def test_method(request):
    for i in User_Skill.objects.raw("select * from game_user_skill;"):
        print(i.skill_name)
    return render(request, 'add_skill.html')


# def add_skill(request):
#     if request.method == 'POST':
#         form = SkillForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect('success')  # Redirect to a success page or another view
#     else:
#         form = SkillForm()

#     return render(request, 'add_skill.html', {'form': form})

def save_data(request):
    if request.method == 'POST':
        user = None

        if request.user.is_authenticated:
            user = request.user.id
            try:
                # Process the data and save it to the database
                data = json.loads(request.body)    # Get the data sent from the JavaScript
                print(data)
                print("=================================")
                data_user_skill = data["User_Skill"]  
                # Save skill data to database
                for skill in data_user_skill:
                    user_skill = get_object_or_404(User_Skill, user = user, skill_name = skill["name"])
                    user_skill.level = skill["level"]
                    user_skill.save()
                    print(f"save for skill {skill['name']} successfully.")
                return JsonResponse({'status': 'success'})
            except Exception as e:
                print("Saved failed.")
                return JsonResponse({'status': 'failed', 'error': str(e)})

    return JsonResponse({'status': 'failed'})


def data(request):
    user = request.user
    if user.is_authenticated:
        main_dict = {}
         #Load skill_level
        skills_dict = []
        skills = User_Skill.objects.raw("select * from game_user_skill where user_id = %s;",[user.id]) 
        for i in skills:
            skill = {}
            skill["skill_name"] = i.skill_name.skill_name
            skill["base_income"] = i.skill_name.base_passive_income
            skill["growth_rate"] = i.skill_name.growth_rate
            skill["base_cost"] = i.skill_name.base_cost
            skill["level"] = i.level
            skills_dict.append(skill)
            print(skill)
        #load ...
        main_dict['skill'] = skills_dict
        data = json.dumps(main_dict)
        return JsonResponse(main_dict)
    else:
        return JsonResponse({"error": "user not authenticated"}, status=401)