import React from 'react';
import Individual from './Individual';
import './TheTeam.css'; 
import Anastasia from '../photos/Anastasia.png';
import Maanas from '../photos/Maanas.png';
import Olivia from '../photos/Olivia.png';
import Victor from '../photos/victor.jpeg';

const teamMembers = [
  {
    name: 'Anastasia Dunca',
    intro: 'Backend/DJ',
    photo: Anastasia,
  },
  {
    name: 'Olivia Munoz',
    intro: 'Frontend',
    photo: Olivia
  },
  {
    name: 'Victor Rosales',
    intro: 'Frontend/Finance',
    photo: Victor
  },
  {
    name: 'Maanas Sharma',
    intro: 'Backend',
    photo: Maanas
  }
];

const TheTeam = () => {
  return (
    <div className="App-header">
      <h1>Meet Our Team</h1>
      <div className="team-members">
        {teamMembers.map((member, index) => (
          <Individual
            key={index}
            name={member.name}
            intro={member.intro}
            photo={member.photo}
          />
        ))}
      </div>
        <p>
            Welcome to Conversa! We are a dedicated team of multilingual students from diverse backgrounds who are passionate about the transformative power of language learning. 
            Our mission is to connect the world by putting any language experience you can imagine at the tips of your fingers. <br />
        </p>
    </div>
  );
};

export default TheTeam;
