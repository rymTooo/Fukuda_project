import json
import time
from django.shortcuts import render,redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.contrib import messages
from game.models import Customization_head, Customization_pants, Customization_shoes, Customization_torso, Event, User_Customization, PowerUp, Setting, Stat, User_Event, User_PowerUp, User_Skill,Skill
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
        #create User_Customization
        custom, custom_created = User_Customization.objects.get_or_create(user = user)
        if custom_created:
            print(f"User_Customization created SUCCESSFUL.")
        else:
            print(f"User_Customization already EXISTS.")
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
       
        return render(request, 'Main.html', {"username": user, "build_timestamp":build_timestamp})
    else:
        return redirect("/authorization/login/")

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
                # Save USER_SKILL data to database
                data_user_skill = data["User_Skill"]
                print("\n--------------------USER SKILL--------------------\n")
                for skill in data_user_skill:
                    user_skill = get_object_or_404(User_Skill, user = user, skill_name = skill["skill_name"])
                    user_skill.level = skill["level"]
                    user_skill.unlocked = skill["unlocked"]
                    user_skill.save()
                    print(f"Save skill: {skill['skill_name']} for user: '{user}' Successfully")
                print("\n---------------------------------------------\n")
                
                # Save STAT
                print("\n--------------------STAT--------------------\n")
                data_stat = data["Stat"]
                stat_obj = get_object_or_404(Stat, user = user)
                for key, value in data_stat.items():
                    setattr(stat_obj, key, value)
                stat_obj.save()
                print(f"Save stat for user: '{user}' Successfully")
                
                
                # Save USER_POWERUP data to database
                print("\n--------------------USER POWERUP--------------------\n")
                data_user_power_up = data["User_PowerUp"]
                for powerup in data_user_power_up:
                    user_powerup = get_object_or_404(User_PowerUp, user = user, powerup_name = powerup["powerupID"])
                    user_powerup.acquired = powerup["purchased"]
                    user_powerup.save()
                    print(f"Save powerup: {powerup['powerupID']} for user: '{user}' Successfully")
                
                # Save SETTING
                print("\n--------------------SETTING--------------------\n")
                data_setting = data["Setting"]
                print(data_setting)
                setting_obj = get_object_or_404(Setting, user = user)
                for key, value in data_setting.items():
                    print(value)
                    setattr(setting_obj, key, value)
                setting_obj.save()
                print(f"Save Setting for user: '{user}' Successfully")
                

                # Save User_Customiztion
                print("\n--------------------User_Customization--------------------\n")
                data_user_customization = data["User_Customization"]
                head = data_user_customization["head"].split('/')[-1].split('.')[0]
                torso = data_user_customization["torso"].split('/')[-1].split('.')[0]
                pants = data_user_customization["pants"].split('/')[-1].split('.')[0]
                shoes = data_user_customization["shoes"].split('/')[-1].split('.')[0]
                head_obj = Customization_head.objects.filter(name__contains = head)
                torso_obj = Customization_torso.objects.filter(name__contains = torso)
                pants_obj = Customization_pants.objects.filter(name__contains = pants)
                shoes_obj = Customization_shoes.objects.filter(name__contains = shoes)

                customization_obj = get_object_or_404(User_Customization, user=user)
                customization_obj.head = head_obj[0]
                customization_obj.torso = torso_obj[0]
                customization_obj.pants = pants_obj[0]
                customization_obj.shoes = shoes_obj[0]
                customization_obj.save()
                print(f"Save Setting for user: '{user}' Successfully")

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
            # print(skill,"skill")
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
            # print(powerup,"powerup")
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
            # print(stat_dict,"stat")
        main_dict["stat"] = stat_dict

        #load setting
        setting_dict = {}
        loaded_setting = Setting.objects.raw("select * from game_setting where user_id = %s;", [user.id])
        for i in loaded_setting:
            setting_dict["theme"] = i.theme
            setting_dict["sound_volumn"] = i.sound_volumn
            setting_dict["notification"] = i.notification
            print(stat_dict,"stat")
        main_dict["setting"] = setting_dict

        #load leaderboard
        leaderboard_list = []
        loaded_leaderboard = Stat.objects.raw("""
                                              SELECT
                                              game_stat.user_id,
                                            game_stat.all_time_money,
                                            auth_user.username
                                        FROM
                                            game_stat
                                        INNER JOIN
                                            auth_user ON game_stat.user_id = auth_user.id
                                    """)
        for i in loaded_leaderboard:
            player = {}
            player["id"] = i.user_id
            player["name"] = i.username
            player["all_time_money"] = i.all_time_money 
            leaderboard_list.append(player)
            print("PLAYER: ",player)
        main_dict["leaderboard"] = leaderboard_list
        

        #load all customisation
        loaded_head = Customization_head.objects.all()
        head_list = []
        for i in loaded_head:
            head_file_part = "../../static/game/head/"+i.file_name
            head_list.append(head_file_part)

        loaded_torso = Customization_torso.objects.all()
        torso_list = []
        for i in loaded_torso:
            torso_file_part = "../../static/game/torso/"+i.file_name
            torso_list.append(torso_file_part)

        loaded_pants = Customization_pants.objects.all()
        pants_list = []
        for i in loaded_pants:
            pants_file_part = "../../static/game/pants/"+i.file_name
            pants_list.append(pants_file_part)
        
        loaded_shoes = Customization_shoes.objects.all()
        shoes_list = []
        for i in loaded_shoes:
            shoes_file_part = "../../static/game/shoes2/"+i.file_name
            shoes_list.append(shoes_file_part)
        customization_dict = {
            "head": head_list,
            "torso": torso_list,
            "pants": pants_list,
            "shoes": shoes_list
            }
        main_dict["customization"]= customization_dict

        # Load User_customizaation
        loaded_user_customiztion = User_Customization.objects.raw('''
                                                                  select 
                                                                  uc.*, ch.file_name, ct.file_name, ct.file_name, cp.file_name, cs.file_name
                                                                  from game_user_customization uc
                                                                  join game_customization_head ch on uc.head_id = ch.name
                                                                  join game_customization_torso ct on uc.torso_id = ct.name
                                                                  join game_customization_pants cp on uc.pants_id = cp.name
                                                                  join game_customization_shoes cs on uc.shoes_id = cs.name
                                                                  where uc.user_id = %s;''', [user.id])

        user_customization_dict = {
            "head": "../../static/game/head/"+loaded_user_customiztion[0].head.file_name,
            "torso": "../../static/game/torso/"+loaded_user_customiztion[0].torso.file_name,
            "pants": "../../static/game/pants/"+loaded_user_customiztion[0].pants.file_name,
            "shoes": "../../static/game/shoes2/"+loaded_user_customiztion[0].shoes.file_name
        }

        main_dict["User_Customization"] = user_customization_dict

        print(main_dict)
        return JsonResponse(main_dict)
    else:
        return JsonResponse({"error": "user not authenticated"}, status=401)
    
def change_username(request):
    if request.method == 'POST':
        user = None

        if request.user.is_authenticated:
            user = request.user.id
            try:
                new_username = json.loads(request.body)["username"]
                user_obj = User.objects.get(pk = user)
                user_obj.username = new_username
                user_obj.save()
                print("This is new username: ", new_username)
                print("============================\nChange Username Complete\n============================\n")
            except Exception as e:
                print(f"Saved failed.: {str(e)}")
                return JsonResponse({'status': 'failed', 'error': str(e)})

    return JsonResponse({'status': 'failed'})