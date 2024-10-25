import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css'; 

const Chatbot = () => {
    const [message, setMessage] = useState('');
    const [responses, setResponses] = useState([]);
    const [language, setLanguage] = useState('Spanish'); // Default language
    const [difficulty, setDifficulty] = useState('Beginner'); // Default difficulty

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://127.0.0.1:5000/api/chat', 
                {
                    message,
                    language,
                    difficulty,
                }
            );
            setResponses([...responses, { user: message, bot: response.data.response }]);
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };


    return (
        <div className="App-chatbot">
            <div>
                {responses.map((resp, index) => (
                    <div key={index}>
                        <p><strong>User:</strong> {resp.user}</p>
                        <p><strong>Bot:</strong> {resp.bot}</p>
                    </div>
                ))}
            </div>
            <div className='select-container'>
            <form onSubmit={handleSubmit}>
                <input className='App-inputBox'
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                />
                <select className= "language-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="Spanish">Spanish</option>
                    <option value="English">English</option>
                    <option value="French">French</option>
                    {/* Add more languages as needed */}
                </select>
                <select className = "difficulty-select" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>
                <button className="send-button" type="submit">Send</button>
            </form>
            </div>
        </div>
    );
};

export default Chatbot;