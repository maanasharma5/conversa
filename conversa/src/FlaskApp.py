from flask import Flask, request, jsonify
from flask_cors import CORS
from ConversaCore import FakeChatbot, ConversaDispatcher

app = Flask(__name__)
CORS(app)
chatter = ConversaDispatcher()

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    message = data.get('message')
    language = data.get('language', "Spanish")
    difficulty = data.get('difficulty', "Beginner")
    
    if not message:
        return jsonify({'error': 'No message provided'}), 400
    if not language:
        return jsonify({'error': 'No language provided'}), 400
    if not difficulty:
        return jsonify({'error': 'No difficulty provided'}), 400
    
    response = chatter.chat(language, difficulty, message)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(port=5000)