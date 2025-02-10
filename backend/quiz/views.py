from django.shortcuts import render
from django.http import HttpResponse


# Create your views here.
from django.http import JsonResponse

def homepage(request):
    # Return a JSON response with the homepage message
    return JsonResponse({"message": "Welcome to the homepage! Press quiz to start."})

def generate_devo(request):
    return JsonResponse({"message": "Your devo will go here"})
