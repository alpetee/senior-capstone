import os
import getpass
import requests
from langchain.chat_models import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
#from googletrans import Translator  # Alternative: Use DeepL API for better translation
from deep_translator import GoogleTranslator


# API Keys
SCRIPTURE_API_KEY = os.getenv("SCRIPTURE_API_KEY") or getpass.getpass("Enter API key for Scripture API: ")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY") or getpass.getpass("Enter API key for OpenAI: ")

# Headers for Scripture API
SCRIPTURE_HEADERS = {"api-key": SCRIPTURE_API_KEY}

class DevoWriter:
    def __init__(self):
        # Initialize OpenAI model via LangChain
        self.model = ChatOpenAI(model="gpt-4o", api_key=OPENAI_API_KEY)

    def fetch_bible_verse(self, passage: str):
        """
        Fetches a Bible verse from the Scripture API.
        :param passage: Bible reference (e.g., "John 3:16")
        :return: Verse text or error message
        """
        url = f"https://api.scripture.api.bible/v1/bibles/ENG-ESV/verses/{passage}"
        response = requests.get(url, headers=SCRIPTURE_HEADERS)
        if response.status_code == 200:
            return response.json().get("data", {}).get("content", "Verse not found.")
        return "Error retrieving verse."

    def translate_text(self, text, target_lang):
        text = str(text)  # Ensure it's a string
        MAX_CHARS = 5000
        chunks = [text[i:i + MAX_CHARS] for i in range(0, len(text), MAX_CHARS)]
        translated_chunks = [GoogleTranslator(source="auto", target=target_lang).translate(chunk) for chunk in chunks]
        return " ".join(translated_chunks)

    def generate_devo(self, user_input, language="en"):
        """
        Generates a culturally adapted devotional.
        :param user_input: Quiz input like ["Korea", "new testament", "loneliness"]
        :param language: Language ('en', 'ja', 'ko', 'es')
        :return: AI-generated devotional text.
        """
        user_input_str = ", ".join(user_input)

        # Fetch relevant Bible verse based on topics
        bible_verse = self.fetch_bible_verse("Matthew 11:28")  # Example verse on loneliness

        # Define structured LangChain prompt
        system_template = (
            "You are a devotional writer skilled in cultural adaptation while not over-doing the cultural aspects. "
            "Don't explicitly mention cultural facts. "
            "Write a devotional incorporating the following themes: {topics}. "
            "Include a relevant Bible verse: {verse}. Ensure it resonates with {culture} culture."

        )

        # Set cultural context based on user input
        culture = "Korean" if "Korea" in user_input else "Japanese" if "Japan" in user_input else "Latin American"

        prompt_template = ChatPromptTemplate.from_messages(
            [("system", system_template), ("user", "{text}")]
        )

        prompt = prompt_template.invoke({
            "topics": user_input_str,
            "verse": bible_verse,
            "culture": culture,
            "text": "Write a culturally adapted devotional."
        })

        # Generate AI response
        response = self.model.invoke(prompt)

        # Translate if needed
        if language != "en":
            response = self.translate_text(response, language)

        return response

    def get_response_content(self, user_input, language="en"):
        """
        Fetches the devotional content with cultural and linguistic adaptation.
        :param user_input: User input for quiz choices.
        :param language: Target language.
        :return: AI-generated devotional.
        """
        response = self.generate_devo(user_input, language)
        return response.content if hasattr(response, 'content') else str(response)


# Example usage
if __name__ == "__main__":
    writer = DevoWriter()

    # Example quiz input
    quiz_input = ["Japan", "new testament", "anger"]

    # Generate devotional in Korean
    generated_response = writer.get_response_content(quiz_input, language="en")

    print("Generated Devotional:", generated_response)
