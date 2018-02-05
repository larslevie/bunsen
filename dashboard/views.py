import json

from django.http import HttpResponse
from django.shortcuts import render

def index(request):
    context = {'foo': 'bar'}

    return render(request, 'dashboard/index.html', context)
