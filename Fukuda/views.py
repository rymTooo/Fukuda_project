from django.shortcuts import redirect

def my_redirect_view(request):
    response = redirect('/game/main/')
    return response