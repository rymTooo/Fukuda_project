from django import forms
from django.forms import ModelForm
from django.contrib.auth.models import User

class SignupForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ['username', 'email']  # Include other fields as needed

    def save(self, commit=True):
        user = super(SignupForm, self).save(commit=False)
        password = self.cleaned_data.get('password')
        user.set_password(password)  # Set the password using set_password method

        if commit:
            user.save()
        return user


class LoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)
