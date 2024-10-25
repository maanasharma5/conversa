import React from 'react';
import './Button.css';


const CuteButton = ({ text }) => {
  return (
    <button className="cute-button" onClick={() => console.log('hi')}>
      {text}
    </button>
  );
};

export default CuteButton;