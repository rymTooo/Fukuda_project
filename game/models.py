from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Stat(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    all_time_money = models.IntegerField()
    passiveincome = models.IntegerField()
    current_money = models.IntegerField()
    money_per_click = models.IntegerField()
    click_counter = models.IntegerField()


class Setting(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    theme = models.CharField(max_length=255)
    sound_volumn = models.DecimalField(max_digits=3, decimal_places=1)
    notification = models.BooleanField()

class FukudaCustomization(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE, primary_key=True)
    Head = models.CharField(max_length=255)
    pant = models.CharField(max_length=255)
    torso = models.CharField(max_length=255)
    shoes = models.CharField(max_length=255)

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

class PowerUp(models.Model):
    powerup_name = models.CharField(max_length=255, primary_key=True)
    accuired = models.BooleanField()
    cost = models.IntegerField()
    multiply = models.IntegerField()
    skill_name = models.ForeignKey(Skill,on_delete=models.CASCADE,default='name')

class User_PowerUp(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    powerup_name = models.ForeignKey(PowerUp, on_delete=models.CASCADE)
