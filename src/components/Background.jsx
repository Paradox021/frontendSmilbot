import React from 'react';
import '../styles/Background.css'; // Asegúrate de crear y referenciar correctamente el archivo CSS
import BubblesCanvas from './BubblesCanvas';

const Background = ({ children }) => {
    return (
      <div className="background flex flex-col justify-center">
        <video autoPlay muted loop id="myVideo" src="/src/assets/videos/bg-animated.mkv"></video>
        {children}
      </div>
    );
  };
  
export default Background;