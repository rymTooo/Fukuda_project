import json
import time
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
        all_skills = Skill.objects.raw("select * from game_skill order by base_cost")
        for skill in all_skills:
            # Retrieve or create a User_Skill instance for the user and skill
            user_skill, user_skill_created = User_Skill.objects.get_or_create(user=user, skill_name=skill)
            
            if user_skill_created:
                print(f"USER_SKILL, skill '{skill.skill_name}' created SUCCESSFUL.")
            else:
                print(f"USER_SKILL, skill '{skill.skill_name}' already exists.")
        #create Stat
        stat, stat_created = Stat.objects.get_or_create(user = user)
        if stat_created:
            print(f"STAT created SUCCESSFUL.")
        else:
            print(f"STAT already EXISTS.")
        #create Setting
        setting, setting_created = Setting.objects.get_or_create(user = user)
        if setting_created:
            print(f"SETTING created SUCCESSFUL.")
        else:
            print(f"SETTING already EXISTS.")
        #create FukudaCustomization
        custom, custom_created = FukudaCustomization.objects.get_or_create(user = user)
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
        all_powerups = PowerUp.objects.raw("select * from game_powerup order by powerup_id")
        for powerup in all_powerups:
            # Retrieve or create a User_Skill instance for the user and skill
            user_powerup, user_powerup_created = User_PowerUp.objects.get_or_create(user=user, powerup_name=powerup)
            
            if user_powerup_created:
                print(f"USER_POWERUP, powerup '{powerup.powerup_name}' created SUCCESSFUL.")
            else:
                print(f"USER_POWERUP, powerup '{powerup.powerup_name}' already exists.")
        print("--------------------------------\n")
        build_timestamp = int(time.time())
       
        return render(request, 'Main.html', {"username": user,"build_timestamp":build_timestamp})
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
                print("\n===============START SAVED==================\n")  
                # Process the data and save it to the database
                
                data = json.loads(request.body)    # Get the data sent from the JavaScript                  
                data_user_skill = data["User_Skill"]
                data_stat = data["Stat"]
                data_user_power_up = data["User_PowerUp"]
                
                # Save USER_SKILL data to database
                for skill in data_user_skill:
                    user_skill = get_object_or_404(User_Skill, user = user, skill_name = skill["skill_name"])
                    user_skill.level = skill["level"]
                    user_skill.unlocked = skill["unlocked"]
                    user_skill.save()
                    print(f"Save skill: {skill['skill_name']} for user: '{user}' Successfully")

                # Save STAT
                stat_obj = get_object_or_404(Stat, user = user)
                for key, value in data_stat.items():
                    setattr(stat_obj, key, value)
                stat_obj.save()
                print(f"Save stat for user: '{user}' Successfully")

                # Save USER_POWERUP data to database
                for powerup in data_user_power_up:
                    user_powerup = get_object_or_404(User_PowerUp, user = user, powerup_name = powerup["powerupID"])
                    user_powerup.acquired = powerup["purchased"]
                    user_powerup.save()
                    print(f"Save powerup: {powerup['powerupID']} for user: '{user}' Successfully")
                
                # Save USER_EVENT

                print("\n===============END SAVED==================\n")
            except Exception as e:
                print(f"Saved failed.: {str(e)}")
                return JsonResponse({'status': 'failed', 'error': str(e)})

    return JsonResponse({'status': 'failed'})


def data(request): #method for sending data from db to javascript
    user = request.user
    if user.is_authenticated:
        main_dict = {}
         #Load skill
        skills_list = []
        skills = User_Skill.objects.raw("select * from game_user_skill where user_id = %s;",[user.id]) 
        for i in skills:
            skill = {}
            skill["skill_name"] = i.skill_name.skill_name
            skill["base_income"] = i.skill_name.base_passive_income
            skill["growth_rate"] = i.skill_name.growth_rate
            skill["base_cost"] = i.skill_name.base_cost
            skill["level"] = i.level
            skill["unlocked"] = i.unlocked
            skills_list.append(skill)
            print(skill,"skill")
        main_dict["skill"] = skills_list

        #load power up
        powerups_list = []
        powerups = User_PowerUp.objects.raw("select * from game_user_powerup where user_id = %s;", [user.id])
        for i in powerups:
            powerup = {}
            powerup["powerupID"] = i.powerup_name.powerup_name
            powerup["skill_name"] = i.powerup_name.skill_name.skill_name
            powerup["multiplier"] = i.powerup_name.multiply
            powerup["cost"] = i.powerup_name.cost
            powerup["skillReq"] = i.powerup_name.skillReq
            powerup["purchased"] = i.acquired
            powerups_list.append(powerup)
            print(powerup,"powerup")
        main_dict["powerup"] = powerups_list

        #load stat
        stat_dict = {}
        loaded_stat = Stat.objects.raw("select * from game_stat where user_id = %s;", [user.id])
        for i in loaded_stat:
            stat_dict["all_time_money"] = i.all_time_money
            stat_dict["passive_income"] = i.passiveincome
            stat_dict["current_money"] = i.current_money
            stat_dict["money_per_click"] = i.money_per_click
            stat_dict["click_counter"] = i.click_counter
            print(stat_dict,"stat")
        main_dict["stat"] = stat_dict


        return JsonResponse(main_dict)
    else:
        return JsonResponse({"error": "user not authenticated"}, status=401)