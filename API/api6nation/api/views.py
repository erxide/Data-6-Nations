from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
import os
from api6nation.settings import BASE_DIR
from .gestion_data import data


def teamstat(request, team_name, year = None, id = None):
    return JsonResponse(data.get_info_team(team_name, year, id))
