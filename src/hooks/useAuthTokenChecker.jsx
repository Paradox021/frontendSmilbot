import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Cookies from 'js-cookie';
import axios from 'axios';

const useAuthTokenChecker = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const location = useLocation();
  useEffect(() => {
    const verifyToken = async () => {
      // TODO: cambiar para obtener token de cookies
      const token = Cookies.get('accessToken');
      const refreshToken = Cookies.get('refreshToken');
      const user = Cookies.get('user');

      // Si no hay token, no está autenticado.
      if (!token || !refreshToken || !user) {
        setIsAuthenticated(false);
        navigate('/login', { state: { from: location }, replace: true });
        return;
      }

      try {
        // Sustituye esta URL por la de tu API de verificación de token.
        const response = await axios.post(import.meta.env.VITE_BACKEND_URL+'/auth/verify-token', {
          token
        });

        console.log(response.status);
        // Si la respuesta del servidor es un error, asume que el token no es válido.
        if (response.status !== 200) {
          throw new Error('Token no válido');
        }

        // Aquí podrías actualizar el estado si necesitas información del usuario.
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error);
        
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        Cookies.remove('user');
        setIsAuthenticated(false);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };

    verifyToken();
  }, [navigate, setIsAuthenticated]);

  return isAuthenticated;
};

export default useAuthTokenChecker;