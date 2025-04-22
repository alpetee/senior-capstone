from django.urls import path
from .views import generate_devo, homepage, submit_quiz


print("QUIZ/URLS PAGEEEEE")  # gettng in here yay
urlpatterns = [
    path("/", homepage, name="base_homepage"),
    path("homepage/", homepage, name="homepage"),
    path("submit/", submit_quiz, name="submit_quiz"),  # Matches `POST /api/submit/`
    path(
        "generate-devo/", generate_devo, name="generate_devo"
    ),  # Matches `GET /api/generate-devo/`
]
