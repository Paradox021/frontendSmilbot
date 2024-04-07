import React from 'react';
import '../styles/LoginCard.css'; // Asegúrate de crear y referenciar correctamente el archivo CSS

const LoginCard = () => {
  return (
    <div className="login-card">
      <div className="image-container">
        <img src="/src/assets/images/cat.webp" alt="a cute orange cat" className="profile-image" />
      </div>
      <h2 className="text">Welcome to Smilbot</h2>
      <button className="login-button">
        <a href="http://localhost:3000/auth/discord">Login with <img id="dc-logo" src="/src/assets/images/discord-logo-white.svg" alt="Discord logo"/></a>
      </button>
    </div>
  );
};

export default LoginCard;