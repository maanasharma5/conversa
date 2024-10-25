import React, { useState, useEffect } from 'react';
import './FadeIn.css';
import CuteButton from './Button';
import TheTeam from './TheTeam';
import Chatbot from '../Pages/Chatbot.js'


const TitleFadeIn = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 500);
  }, []);

  return (
    <p className={`title ${isVisible ? 'fade-in' : ''}`}>
      <div className='title-card'>
        <h1>Conversa</h1>
        <p>Conversa is an immersive learning experience that helps you foster fluency and cultural understanding in any target language!</p>
      </div>
      <TheTeam />
      <Chatbot />
    </p>
  );
};

export default TitleFadeIn;