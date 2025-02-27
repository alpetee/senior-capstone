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
# SCRIPTURE_API_KEY = os.getenv("SCRIPTURE_API_KEY") or getpass.getpass("Enter API key for Scripture API: ")
# OPENAI_API_KEY = os.getenv("OPENAI_API_KEY") or getpass.getpass("Enter API key for OpenAI: ")
# # Headers for Scripture API
# SCRIPTURE_HEADERS = {"api-key": SCRIPTURE_API_KEY}



# Global quiz state (this can be replaced with a database if needed)
globalQuizState = {}

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

    def generate_devo(self, request, language="en"):
        """Generates a devotional based on quiz state."""
        print("in top devo generator:")
        if request.method == "POST":
            quizState = request.session.get('quizState', {})  # Retrieve from sessions
            print("Retrieved quizState!!!:", quizState)  # Debugging output
        #     writer = DevoWriter()
        #     devotional = writer.generate_devo(quizState, language="en")
        #     return JsonResponse({"devo": devotional})
        # return JsonResponse({"error": "Invalid request method"}, status=405)

        topic = quizState.get('q3')
        culture = quizState.get('q1')
        section = quizState.get('q2')
        # if quiz_state.get('q2', '') == ('paralells between th two":'
        #                                 '')

        system_template = (
            "You are a devotional writer skilled in cultural adaptation."
            "Write a devotional on the following theme: {topic} noting that the listener is from {culture}."
            "Include {topic} in the title."
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


"""
for testiing other formatting: 
"""
# from django.http import JsonResponse
# from django.views import View
#
# class DevoWriter(View):
#     def __init__(self):
#         super().__init__()
#         self.model = ChatOpenAI(model="gpt-4o", api_key=OPENAI_API_KEY)
#
#     def fetch_bible_verse(self, passage: str):
#         """Fetches a Bible verse from the Scripture API."""
#         url = f"https://api.scripture.api.bible/v1/bibles/ENG-ESV/verses/{passage}"
#         response = requests.get(url, headers=SCRIPTURE_HEADERS)
#         if response.status_code == 200:
#             return response.json().get("data", {}).get("content", "Verse not found.")
#         return "Error retrieving verse."
#
#     def translate_text(self, text, target_lang):
#         """Translates text using Google Translator."""
#         text = str(text)
#         MAX_CHARS = 5000
#         chunks = [text[i:i + MAX_CHARS] for i in range(0, len(text), MAX_CHARS)]
#         translated_chunks = [GoogleTranslator(source="auto", target=target_lang).translate(chunk) for chunk in chunks]
#         return " ".join(translated_chunks)
#
#     def generate_devo(self, request, language="en"):
#         """Generates a devotional based on quiz state."""
#         if request.method == "POST":
#             quizState = request.session.get('quizState', {})  # Retrieve from sessions
#             print("Retrieved quizState!!!:", quizState)  # Debugging output
#
#             topic = globalQuizState.get('q3', '')
#             culture = "North America"  # quiz_state.get("q1", "general")
#             section = "new testament"  # quiz_state.get('q2', '')
#
#             system_template = (
#                 "You are a devotional writer skilled in cultural adaptation."
#                 "Write a devotional on the following theme: {topic} noting that the listener is from {culture}."
#                 "Include {topic} in the title."
#                 "Include a relevant Bible verse from {section} of the bible. Ensure it resonates with the topic {topic} and {culture} culture."
#             )
#
#             prompt_template = ChatPromptTemplate.from_messages(
#                 [("system", system_template), ("user", "{text}")]
#             )
#
#             prompt = prompt_template.invoke({
#                 "topic": topic,
#                 "culture": culture,
#                 "section": section,
#                 "text": "Write a devotional."
#             })
#
#             return JsonResponse({"devo": prompt})  # Return the generated devotional
#
#         return JsonResponse({"error": "Invalid request method"}, status=405)

# Django view to submit quiz
# @csrf_exempt
# def submit_quiz(request):
#     """Handles storing quiz answers."""
#     global globalQuizState
#     if request.method == "POST":
#         try:
#             data = json.loads(request.body)
#             globalQuizState.update(data)
#             return JsonResponse({"message": "Quiz submitted successfully"})
#         except json.JSONDecodeError:
#             return JsonResponse({"error": "Invalid JSON data"}, status=400)
#     return JsonResponse({"error": "Invalid request method"}, status=405)
# @csrf_exempt
# def submit_quiz(request):
#     """Handles storing quiz answers."""
#     if request.method == "POST":
#         try:
#             data = json.loads(request.body)
#             request.session['quizState'] = data  # Store in session
#             request.session.modified = True
#             return JsonResponse({"message": "Quiz submitted successfully"})
#         except json.JSONDecodeError:
#             return JsonResponse({"error": "Invalid JSON data"}, status=400)
#     return JsonResponse({"error": "Invalid request method"}, status=405)
@csrf_exempt
def submit_quiz(request):
    """Handles storing quiz answers and triggering devotional generation at Q3."""
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            request.session['quizState'] = data  # Store quiz data in session
            request.session.modified = True

            # Generate devotional ONLY if Q3 is answered
            if 'q3' in data and data['q3']:
                # Create instance of DevoWriter and call generate_devo
                writer = DevoWriter()
                devotional = writer.generate_devo(request, language="en")

                # Store the generated devotional in session
                request.session['generatedDevo'] = devotional
                request.session.modified = True

            return JsonResponse(
                {"message": "Quiz submitted successfully", "devo": request.session.get('generatedDevo', '')})
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)
# Django view to generate devotional
@csrf_exempt
# def generate_devo(request):
#     """Handles devotional generation."""
#     if request.method == "POST":
#         writer = DevoWriter()
#         devotional = writer.generate_devo(globalQuizState, language="en")
#         return JsonResponse({"devo": devotional})
#     return JsonResponse({"error": "Invalid request method"}, status=405)
# @csrf_exempt
# def generate_devo(request):
#     """Handles devotional generation."""
#     print("inside denerage_deo")
#     if request.method == "POST":
#         quizState = request.session.get('quizState', {})  # Retrieve from sessions
#         print("Retrieved quizState!!!:", quizState)  # Debugging output
#         writer = DevoWriter()
#         devotional = writer.generate_devo(quizState, language="en")
#         return JsonResponse({"devo": devotional})
#     return JsonResponse({"error": "Invalid request method"}, status=405)
def generate_devo(request):
    """Generates a devotional based on quiz state."""
    print("in bottom deverate devo!!")
    if request.method == "POST":
        quizState = request.session.get('quizState', {})  # Retrieve from session
        print("Retrieved quizState!!!:", quizState)  # Debugging output

        # Define necessary variables for the devotional
        topic = 'lonliness' # quizState.get('q3')
        culture = 'Japan' #quizState.get('q1')
        section = quizState.get('q2')

        # System template for generating the devotional
        system_template = (
            "You are a devotional writer skilled in cultural adaptation."
            "Write a devotional on the following theme: {topic} noting that the listener is from {culture}."
            "Include {topic} in the title."
            "Include a relevant Bible verse from {section} of the bible. Ensure it resonates with the topic {topic} and {culture} culture."
        )

        # Set up the prompt for the AI model
        prompt_template = ChatPromptTemplate.from_messages(
            [("system", system_template), ("user", "{text}")]
        )

        prompt = prompt_template.invoke({
            "topic": topic,
            "culture": culture,
            "section": section,
            "text": "Write a devotional."
        })

        # Call the AI model to generate the devotional
        model = ChatOpenAI(model="gpt-4o", api_key=OPENAI_API_KEY)
        response = model.invoke(prompt)

        # Handle both single AIMessage and list of AIMessage objects
        if isinstance(response, list):  # Case where response is a list of messages
            response = "\n".join([msg.content for msg in response if isinstance(msg, AIMessage)])
        elif isinstance(response, AIMessage):  # if response is a single message
            response = response.content

        # Return the devotional as a JSON response
        return JsonResponse({"devo": response})

    # Handle case where the request is not a POST
    return JsonResponse({"error": "Invalid request method"}, status=405)