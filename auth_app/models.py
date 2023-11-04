from django.db import models
# Create your models here.

class Stat(models.Model):
    username = models.CharField(max_length=255, primary_key=True)
    all_time_money = models.IntegerField()
    passiveincome = models.IntegerField()
    current_money = models.IntegerField()
    money_per_click = models.IntegerField()
    click_counter = models.IntegerField()


class Setting(models.Model):
    username = models.CharField(max_length=255, primary_key=True)
    theme = models.CharField(max_length=255)
    sound_volumn = models.DecimalField(max_digits=3, decimal_places=1)
    notification = models.BooleanField()