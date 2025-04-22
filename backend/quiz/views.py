import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import os
from dotenv import load_dotenv

# Load variables from .env
load_dotenv()

# Get API key from environment
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
SCRIPTURE_API_KEY = os.getenv("SCRIPTURE_API_KEY")
SCRIPTURE_HEADERS = {"api-key": SCRIPTURE_API_KEY}


# Global quiz state (this can be replaced with a database if needed)
globalQuizState = {}


def homepage(request):
    # Return a JSON response with the homepage message
    print("=== Homepage View Triggered ===")

    return JsonResponse({"message": "Homepage welcome"})


class DevoWriter:
    def __init__(self):
        from langchain.chat_models import ChatOpenAI

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
        from deep_translator import GoogleTranslator

        text = str(text)
        MAX_CHARS = 5000
        chunks = [text[i : i + MAX_CHARS] for i in range(0, len(text), MAX_CHARS)]
        translated_chunks = [
            GoogleTranslator(source="auto", target=target_lang).translate(chunk)
            for chunk in chunks
        ]
        return " ".join(translated_chunks)


"""
for testiing other formatting: 
"""


#
@csrf_exempt
def submit_quiz(request):
    """Handles storing quiz answers."""
    print("IN SUBMIT QUIZ - REQUEST RECEIVED")  # Debugging
    if request.method == "POST":
        try:
            # Print raw request body for debugging
            print("Raw request body:", request.body)

            data = json.loads(request.body)
            print("Parsed JSON data:", data)  # Debugging

            # Store in session
            request.session["quizState"] = data
            request.session.modified = True
            print("Session after update:", request.session["quizState"])  # Debugging

            return JsonResponse(
                {"message": "Quiz submitted successfully", "data": data}
            )

        except Exception as e:
            print("Error:", str(e))  # Debugging
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt
def generate_devo(request):
    from langchain.chat_models import ChatOpenAI
    from langchain_core.prompts import ChatPromptTemplate
    from langchain_core.messages import AIMessage

    """Generates a devotional based on quiz state."""
    print("\n=== GENERATE_DEVO VIEW TRIGGERED ===")  # Debug

    if request.method == "POST":
        try:
            # Parse JSON data
            data = json.loads(request.body)
            print("Parsed JSON data:", data)

            quiz_state = data.get("quizState", {})
            print("Quiz state received:", quiz_state)

            # Get values with defaults
            topic = quiz_state.get("q3", "DEFAULT_TOPIC")
            culture = quiz_state.get("q1", "DEFAULT_CULTURE")
            section = quiz_state.get("q2", "DEFAULT_SECTION")

            print(f"Generating devotional for: {topic}, {culture}, {section}")  # Debug

            # System template
            system_template = (
                "You are a devotional writer skilled in cultural adaptation.\n"
                "Write a devotional on: {topic} for someone from {culture}.\n"
                "Include '{topic}' in the title. this should be the first line.\n"
                "Include a relevant Bible verse from {section}. this should be the SECOND line.\n"
                "include a relevant prauer. this should be the last line.\n"
                "format it like this: Title newline bible verse newline devotional new line Prayer: prayer.\n"
            )

            prompt_template = ChatPromptTemplate.from_messages(
                [("system", system_template), ("user", "Write a devotional.")]
            )

            prompt = prompt_template.invoke(
                {
                    "topic": topic,
                    "culture": culture,
                    "section": section,
                }
            )

            # Generate response
            model = ChatOpenAI(model="gpt-4o", api_key=OPENAI_API_KEY)
            response = model.invoke(prompt)

            # Handle response and split the content into structured components
            if isinstance(response, list):
                content = "\n".join(
                    [msg.content for msg in response if isinstance(msg, AIMessage)]
                )
            elif isinstance(response, AIMessage):
                content = response.content
            else:
                content = str(response)

            print("Generated devo!!! ac content: ", content)
            # Assuming the content follows a format like:
            # Title, Verse, Body, Prayer
            lines = content.split("\n")

            # Remove '**' from the title and verse
            title = lines[0].replace("**", "")  # First line is the title

            # Verse (second line) without '**'
            verse = lines[1].replace("**", "")  # Second line is the verse

            # Body: everything between the title and prayer
            body = "\n".join(
                lines[2:-2]
            )  # Body content (excluding the title, verse, and prayer)

            # Prayer: combine the second-to-last line "Prayer:" with the last line (the actual prayer)
            prayer = f"{lines[-2]} {lines[-1]}".replace(
                "**", ""
            )  # Combine "Prayer:" label and prayer text, remove '**'

            # Return structured data
            return JsonResponse(
                {
                    "title_devo": title,
                    "verse_devo": verse,
                    "content_devo": body,
                    "prayer_devo": prayer,
                    "status": "success",
                    "quiz_state_received": quiz_state,
                }
            )

        except Exception as e:
            print("Error in generate_devo:", str(e))  # Debug
            return JsonResponse({"error": str(e), "status": "error"}, status=500)

    return JsonResponse(
        {"error": "Invalid request method", "status": "error"}, status=405
    )


# for translating: not currently working lol
def get_language(culture):
    if culture == "LATIN/CENTRAL AMERICA":
        return "es"  # Spanish
    elif culture == "KOREA":
        return "ko"  # Korean
    elif culture == "JAPAN":
        return "ja"  # Japanese
    else:
        return "en"  # Default to English


def translate_text(self, text, target_lang):
    """Translates text using Google Translator."""
    from deep_translator import GoogleTranslator

    text = str(text)
    MAX_CHARS = 5000
    chunks = [text[i : i + MAX_CHARS] for i in range(0, len(text), MAX_CHARS)]
    translated_chunks = [
        GoogleTranslator(source="auto", target=target_lang).translate(chunk)
        for chunk in chunks
    ]
    return " ".join(translated_chunks)
