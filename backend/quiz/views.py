import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from langchain.chat_models import ChatOpenAI
from langchain_core.messages import AIMessage
from langchain_core.prompts import ChatPromptTemplate
from deep_translator import GoogleTranslator
import json
import os
import getpass


# API Keys
SCRIPTURE_API_KEY = os.getenv("SCRIPTURE_API_KEY") or getpass.getpass("Enter API key for Scripture API: ")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY") or getpass.getpass("Enter API key for OpenAI: ")

# Headers for Scripture API
SCRIPTURE_HEADERS = {"api-key": SCRIPTURE_API_KEY}

# Global quiz state (this can be replaced with a database if needed)
global_quiz_state = {}

def homepage(request):
    # Return a JSON response with the homepage message
    return JsonResponse({"message": "Homepage welcome"})

class DevoWriter:
    def __init__(self):
        self.model = ChatOpenAI(model="gpt-4o", api_key=OPENAI_API_KEY)

    def fetch_bible_verse(self, passage: str):
        """Fetches a Bible verse from the Scripture API."""
        url = f"https://api.scripture.api.bible/v1/bibles/ENG-ESV/verses/{passage}"
        response = requests.get(url, headers=SCRIPTURE_HEADERS)
        if response.status_code == 200:
            return response.json().get("data", {}).get("content", "Verse not found.")
        return "Error retrieving verse."

    def translate_text(self, text, target_lang):
        """Translates text using Google Translator."""
        text = str(text)
        MAX_CHARS = 5000
        chunks = [text[i:i + MAX_CHARS] for i in range(0, len(text), MAX_CHARS)]
        translated_chunks = [GoogleTranslator(source="auto", target=target_lang).translate(chunk) for chunk in chunks]
        return " ".join(translated_chunks)

    def generate_devo(self, quiz_state, language="en"):
        """Generates a devotional based on quiz state."""
        topic = quiz_state.get('q3', '')
        culture = quiz_state.get("q1", "general")
        section = quiz_state.get('q2', '')
        # if quiz_state.get('q2', '') == ('paralells between th two":'
        #                                 '')

        system_template = (
            "You are a devotional writer skilled in cultural adaptation."
            "Write a devotional on the following theme: {topic} through a {culture} cultural lense."
            "Include a relevant Bible verse from {section} of the bible. Ensure it resonates with the topic {topic} and {culture} culture."
        )

        prompt_template = ChatPromptTemplate.from_messages(
            [("system", system_template), ("user", "{text}")]
        )

        prompt = prompt_template.invoke({
            "topic": topic,
            "culture": culture,
            "section": section,
            "text": "Write a devotional."
        })

        response = self.model.invoke(prompt)
        # Handle both single AIMessage and list of AIMessage objects
        if isinstance(response, list):  # Case where response is a list of messages
            # Extract content from each message
            response = "\n".join([msg.content for msg in response if isinstance(msg, AIMessage)])
        elif isinstance(response, AIMessage):  # Case where response is a single message
            response = response.content


        if language != "en":
            response = self.translate_text(response, language)

        return response


# Django view to submit quiz
@csrf_exempt
def submit_quiz(request):
    """Handles storing quiz answers."""
    global global_quiz_state
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            global_quiz_state.update(data)
            return JsonResponse({"message": "Quiz submitted successfully"})
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)


# Django view to generate devotional
@csrf_exempt
def generate_devo(request):
    """Handles devotional generation."""
    if request.method == "POST":
        writer = DevoWriter()
        devotional = writer.generate_devo(global_quiz_state, language="en")
        return JsonResponse({"devo": devotional})
    return JsonResponse({"error": "Invalid request method"}, status=405)
