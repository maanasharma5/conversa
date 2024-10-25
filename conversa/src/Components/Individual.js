import React from 'react';
import './Individual.css';

const Individual = ({ name, intro, photo }) => {
  return (
    <div className="member">
      <img src={photo} alt={name} className="member-photo" />
      <h2 className="member-name">{name}</h2>
      <p className="member-intro">{intro}</p>
    </div>
  );
};

export default Individual;
