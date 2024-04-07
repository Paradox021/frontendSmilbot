import React from 'react';
import Background from '../components/Background';
import LoginCard from '../components/LoginCard';
import '../styles/Login.css'; // Si tienes estilos específicos para la página de login

const Login = () => {
  return (
    <>
        <Background>
          <LoginCard />    
        </Background>
    </>
  );
};

export default Login;