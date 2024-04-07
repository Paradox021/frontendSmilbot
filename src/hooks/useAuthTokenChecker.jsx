import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const useAuthTokenChecker = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const location = useLocation();
  useEffect(() => {
    const verifyToken = async () => {
      // TODO: cambiar para obtener token de cookies
      const token = localStorage.getItem('token');

      // Si no hay token, no está autenticado.
      if (!token) {
        setIsAuthenticated(false);
        navigate('/login', { state: { from: location }, replace: true });
        return;
      }

      try {
        // Sustituye esta URL por la de tu API de verificación de token.
        const response = await fetch(import.meta.env.VITE_BACKEND_URL+'/auth/verifyToken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        // Si la respuesta del servidor es un error, asume que el token no es válido.
        if (!response.ok) {
          throw new Error('Token no válido');
        }

        // Aquí podrías actualizar el estado si necesitas información del usuario.
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error);
        
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };

    verifyToken();
  }, [navigate, setIsAuthenticated]);

  return isAuthenticated;
};

export default useAuthTokenChecker;