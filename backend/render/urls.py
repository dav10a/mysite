from django.urls import path

from . import views

urlpatterns = [
    path('login', views.login, name='login'),
    path('api', views.api, name='api'),
    path('getuser', views.getuser, name='getuser')
]
