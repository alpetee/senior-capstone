import os
import getpass
from langchain.chat_models import init_chat_model
from langchain_core.prompts import ChatPromptTemplate


class DevoWriter:
    def __init__(self, api_key=None):
        # Handle OpenAI API key
        if api_key:
            os.environ["OPENAI_API_KEY"] = api_key
        elif not os.environ.get("OPENAI_API_KEY"):
            os.environ["OPENAI_API_KEY"] = getpass.getpass("Enter API key for OpenAI: ")

        # Initialize Langchain model
        self.model = init_chat_model("gpt-4o-mini", model_provider="openai")

    def generate_devo(self, user_input):
        """
        Generates a devotional (currently a story until set up with the database)

        :param user_input: The list of quiz choices for devo generation.
        :return: The AI-generated response.
        """
        # Convert the list input into a string (e.g., a prompt that makes sense for the AI)
        user_input_str = ", ".join(user_input)

        # Define the system message to guide the AI's task
        system_template = "Generate a story based on the following topics: {topics}"

        # Create a prompt template using the user input
        prompt_template = ChatPromptTemplate.from_messages(
            [("system", system_template), ("user", "{text}")]
        )

        # Prepare the message for the model, filling the placeholders with user input
        prompt = prompt_template.invoke({"topics": user_input_str, "text": "Please write a story about these topics that talks about the bible."})

        # Call the model to generate a response
        response = self.model.invoke(prompt)

        # Return the response
        return response

    def get_response_content(self, user_input):
        """
        Get the content of the generated story.

        :param user_input: The input from the user for which the story is generated.
        :return: The content of the generated AI response.
        """
        response = self.generate_devo(user_input)
        if hasattr(response, 'content'):
            return response.content
        return str(response)  # Fallback if content is not available


# Example usage
if __name__ == "__main__":
    writer = DevoWriter()

    # Example user input from a quiz (will be replaced with dynamic input)
    quiz_input = ["Korea", "new testament", "loneliness"]

    # Generate story/devo
    generated_response = writer.get_response_content(quiz_input)

    print("Generated Story/Devo:", generated_response)
