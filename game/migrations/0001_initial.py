# Generated by Django 4.1.12 on 2023-11-26 05:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('event_name', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('effect', models.CharField(max_length=255)),
                ('massage', models.CharField(max_length=255)),
                ('Probability', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='FukudaCustomization',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('Head', models.CharField(default='default', max_length=255)),
                ('pant', models.CharField(default='default', max_length=255)),
                ('torso', models.CharField(default='default', max_length=255)),
                ('shoes', models.CharField(default='default', max_length=255)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('Head', models.CharField(default='default', max_length=255)),
                ('pant', models.CharField(default='default', max_length=255)),
                ('torso', models.CharField(default='default', max_length=255)),
                ('shoes', models.CharField(default='default', max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='PowerUp',
            fields=[
                ('powerup_name', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('cost', models.IntegerField()),
                ('multiply', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Setting',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('theme', models.CharField(default='default', max_length=255)),
                ('sound_volumn', models.DecimalField(decimal_places=1, default=50.0, max_digits=3)),
                ('notification', models.BooleanField(default=1)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('theme', models.CharField(default='default', max_length=255)),
                ('sound_volumn', models.DecimalField(decimal_places=1, default=50.0, max_digits=3)),
                ('notification', models.BooleanField(default=1)),
            ],
        ),
        migrations.CreateModel(
            name='Skill',
            fields=[
                ('skill_name', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('base_passive_income', models.FloatField(default=0)),
                ('base_cost', models.FloatField(default=0)),
                ('increase_per_click', models.FloatField(default=0)),
                ('growth_rate', models.FloatField(default=0)),
                ('base_passive_income', models.FloatField(default=0)),
                ('base_cost', models.FloatField(default=0)),
                ('increase_per_click', models.FloatField(default=0)),
                ('growth_rate', models.FloatField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Stat',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('all_time_money', models.BigIntegerField(default=0, max_length=255)),
                ('passiveincome', models.BigIntegerField(default=0, max_length=255)),
                ('current_money', models.BigIntegerField(default=0, max_length=255)),
                ('money_per_click', models.IntegerField(default=0, max_length=255)),
                ('click_counter', models.BigIntegerField(default=0, max_length=255)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('all_time_money', models.BigIntegerField(default=0, max_length=255)),
                ('passiveincome', models.BigIntegerField(default=0, max_length=255)),
                ('current_money', models.BigIntegerField(default=0, max_length=255)),
                ('money_per_click', models.IntegerField(default=0, max_length=255)),
                ('click_counter', models.BigIntegerField(default=0, max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='User_Skill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('level', models.IntegerField(default=1)),
                ('skill_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='game.skill')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='User_PowerUp',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('accuired', models.BooleanField(default=0)),
                ('accuired', models.BooleanField(default=0)),
                ('powerup_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='game.powerup')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='User_Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='game.event')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='powerup',
            name='skill_name',
            field=models.ForeignKey(default='name', on_delete=django.db.models.deletion.CASCADE, to='game.skill'),
        ),
    ]
