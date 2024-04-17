from django.urls import path, include
from .views import *

urlpatterns = [
    path('<str:team_name>/<int:year>', teamstat, name="teamstat"),
    path('<str:team_name>/<str:id>', teamstat, name="teamstat"),
    path('<str:team_name>/<int:year>/<str:id>', teamstat, name="teamstat"),
    path('<str:team_name>', teamstat, name="teamstat"),
    path('stats/', list_stats, name='list_stats')

]