from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Stat(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    all_time_money = models.IntegerField(default=0)
    passiveincome = models.IntegerField(default=0)
    current_money = models.IntegerField(default=0)
    money_per_click = models.IntegerField(default=0)
    click_counter = models.IntegerField(default=0)


class Setting(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    theme = models.CharField(max_length=255,default="default")
    sound_volumn = models.DecimalField(max_digits=3, decimal_places=1,default=50.0)
    notification = models.BooleanField(default=1)

class FukudaCustomization(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE, primary_key=True)
    Head = models.CharField(max_length=255,default="default")
    pant = models.CharField(max_length=255,default="default")
    torso = models.CharField(max_length=255,default="default")
    shoes = models.CharField(max_length=255,default="default")

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
    level = models.IntegerField(default=1)

class PowerUp(models.Model):
    powerup_name = models.CharField(max_length=255, primary_key=True)
    cost = models.IntegerField()
    multiply = models.IntegerField()
    skill_name = models.ForeignKey(Skill,on_delete=models.CASCADE,default='name')

class User_PowerUp(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    powerup_name = models.ForeignKey(PowerUp, on_delete=models.CASCADE)
    accuired = models.BooleanField(default=0)
