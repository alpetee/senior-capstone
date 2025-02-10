from django.urls import path
from .views import generate_devo, homepage  # Import the views

urlpatterns = [
    path('generate-devo/', generate_devo, name='generate_devo'),
    path('api/homepage/', homepage, name='homepage'),  # Endpoint to fetch the homepage message
]