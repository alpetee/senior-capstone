"""
URL configuration for devo_generator project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from quiz import views  # Importing views from quiz app

urlpatterns = [
    path("admin/", admin.site.urls),
    # Direct API endpoints from quiz views
    path(
        "api/homepage/", views.homepage, name="homepage"
    ),  # API response for frontend connection
    path("", views.homepage, name="root-homepage"),  # Serve homepage at root
    # Include app-level URLs for the quiz app
    path("api/", include("quiz.urls")),  # Now all quiz URLs are prefixed with /api/
]
