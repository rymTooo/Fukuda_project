from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Stat(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    all_time_money = models.BigIntegerField(default=0)
    passiveincome = models.BigIntegerField(default=0)
    current_money = models.BigIntegerField(default=0)
    money_per_click = models.IntegerField(default=1)
    click_counter = models.BigIntegerField(default=0)


class Setting(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    theme = models.CharField(max_length=255,default="Jungle")
    sound_volumn = models.DecimalField(max_digits=1, decimal_places=1,default=0.5)
    notification = models.BooleanField(default=1)


class Customization_head(models.Model):
    name = models.CharField(max_length=255,default="default", primary_key= True)
    file_name = models.CharField(max_length=255,default="default")

class Customization_torso(models.Model):
    name = models.CharField(max_length=255,default="default", primary_key= True)
    file_name = models.CharField(max_length=255,default="default")

class Customization_pants(models.Model):
    name = models.CharField(max_length=255,default="default", primary_key= True)
    file_name = models.CharField(max_length=255,default="default")

class Customization_shoes(models.Model):
    name = models.CharField(max_length=255,default="default", primary_key= True)
    file_name = models.CharField(max_length=255,default="default")

class User_Customization(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE, primary_key=True)
    head = models.ForeignKey(Customization_head, null=True, default=None,on_delete=models.CASCADE)
    torso = models.ForeignKey(Customization_torso, null=True, default=None,on_delete=models.CASCADE)
    pants = models.ForeignKey(Customization_pants, null=True, default=None,on_delete=models.CASCADE)
    shoes = models.ForeignKey(Customization_shoes, null=True, default=None,on_delete=models.CASCADE)


class Event(models.Model):
    event_name = models.CharField(max_length=255,primary_key=True)
    effect = models.CharField(max_length=255)
    massage = models.CharField(max_length=255)
    Probability = models.IntegerField()


class User_Event(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event_name = models.ForeignKey(Event, on_delete=models.CASCADE)

 
class Skill(models.Model):
    skill_name = models.CharField(max_length=255, primary_key=True)
    base_passive_income = models.FloatField(default=0)
    base_cost = models.FloatField(default=0)
    increase_per_click = models.FloatField(default=0)
    growth_rate = models.FloatField(default=0)
    



class User_Skill(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    skill_name = models.ForeignKey(Skill, on_delete=models.CASCADE)
    level = models.IntegerField(default=0)
    unlocked = models.BooleanField(default=0)

class PowerUp(models.Model):
    powerup_id = models.IntegerField(default=0, auto_created=True)
    powerup_name = models.CharField(max_length=255, primary_key=True)
    cost = models.BigIntegerField()
    multiply = models.IntegerField()
    skill_name = models.ForeignKey(Skill,on_delete=models.CASCADE,default='name')
    skillReq = models.IntegerField(default=0)

class User_PowerUp(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    powerup_name = models.ForeignKey(PowerUp, on_delete=models.CASCADE)
    acquired = models.BooleanField(default=0)
