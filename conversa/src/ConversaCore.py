import openai
import time
import os

client = openai.OpenAI(api_key=os.getenv("CONVERSA_OPENAI_KEY"))

class ConversaChatbot:
    def __init__(self, language, difficulty):
        self.language = language
        self.difficulty = difficulty
        self.messages = self._generate_messages()

    # def reset_language_and_difficulty(self, language=None, difficulty=None):
    #     print("setting language")
    #     if language:
    #         self.language = language
    #     if difficulty:
    #         self.difficulty = difficulty
    #     self.messages = self._generate_messages()
    #     # resets previous history

    def _generate_messages(self):
        return [
            {
            "role": "system",
            "content": [
                {
                "type": "text",
                "text": f"""
                You are Conversa, a conversational language assistant. The user is practicing {self.language} at a difficulty level {self.difficulty}. 
                
                You will engage in a conversation with them in {self.language} at the {self.difficulty} language level, and respond do them in an engaging way. They might make mistakes in the language, so correct them if they make any mistakes. Provide help and feedback as needed, but try to stay talking in {self.language} as much possible.
                """
                }
            ]
            },
        ]

    def _add_user_message(self, user_message):
        self.messages.append(
            {
            "role": "user",
            "content": [
                {
                "type": "text",
                "text": user_message
                }
            ]
            }
        )

    def _add_conversa_response(self, conversa_response):
        self.messages.append(
            {
            "role": "assistant",
            "content": [
                {
                "type": "text",
                "text": conversa_response
                }
            ]
            }
        )


    def chat(self, user_message):
        print("user_message", user_message)
        self._add_user_message(user_message)

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=self.messages,
            temperature=1,
            max_tokens=2048,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0,
            response_format={
                "type": "text"
            }
        )

        # Extract and store the response text
        conversa_response = response.choices[0].message.content
        self._add_conversa_response(conversa_response)
        print("conversa_response", conversa_response)
        return conversa_response

class ConversaDispatcher:
    def __init__(self):
        self.chatbots = {}

    def add_chatbot(self, language, difficulty):
        self.chatbots[(language, difficulty)] = ConversaChatbot(language, difficulty)
    
    def get_chatbot(self, language, difficulty):
        if (language, difficulty) not in self.chatbots:
            self.add_chatbot(language, difficulty)
        return self.chatbots[(language, difficulty)]

    def chat(self, language, difficulty, user_message):
        chatbot = self.get_chatbot(language, difficulty)
        return chatbot.chat(user_message)

class FakeChatbot:
    def __init__(self):
        pass
    
    def get_response(self, user_input):
        return "This is a fake response to user input: " + user_input

if __name__ == "__main__":

    # Example usage
    conversa = ConversaChatbot("Spanish", "Beginner")

    user_input1 = "Estoy bueno!"
    conversa.chat(user_input1)

    # switch language

    conversa.reset_language_and_difficulty(language="French")

    # Next user input
    user_input2 = "¿Cómo se dice 'apple' en español?"
    conversa.chat(user_input2)
