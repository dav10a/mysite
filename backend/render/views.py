from datetime import datetime
from re import U
from django.shortcuts import render
from django.contrib.auth.models import User
#import request
from django.core.handlers.wsgi import WSGIRequest
from flask import redirect, session
from django.contrib.auth import authenticate
from django.contrib.sessions.models import Session
#current time
from django.utils import timezone
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
def api(request: WSGIRequest):
    #if not logged in, redirect to login page
    username = request.session.get('username')
    if username is None:
        return render(request, 'login.html')
    #if logged in, render the index page
    #get ip adress of session
    active_sessions = Session.objects.filter(expire_date__gte=timezone.now())
    all_usernames = [session.get_decoded()["username"]
                     for session in active_sessions if session.get_decoded()["username"] != username]
    return render(request, 'home.html', {'name': username,'sessions':all_usernames})


@api_view(['GET'])
def getuser(request: WSGIRequest):
    username = request.session.get('username', None)
    print(request.session.session_key)
    return Response({"username":"",'sessionid':request.session.session_key})


@api_view(['POST'])
@csrf_exempt

def login(request: WSGIRequest):
    print("hi")
    #print submitted data
    
    request.session["username"] = request.data.get("username")
    print(request.session["username"])
    print(request.session.session_key)
   
    return Response({"message":"fdHello, world. You're at the polls index."})



# also works with Session.objects.get_queryset()

    #handle post request with username and pasword
    if request.method == 'POST':
        #print request.POST
        #print form data
        print(request.POST.dict())
        username = request.POST['username']
        request.session['username'] = username
        #add request.sesssion to the database
        request.session.save()
        return index(request)

        #show index with username
    else:
        #show login page
        return render(request, 'login.html')

