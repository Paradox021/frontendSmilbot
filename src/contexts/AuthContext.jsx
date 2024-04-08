import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext({ isAuthenticated: false, setIsAuthenticated: () => {} });

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // TODO: cambiar para obtener token de cookies
    const token = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');
    const user = Cookies.get('user');
    console.log("Token obtenido: "+token);
    setIsAuthenticated(!!token && !!refreshToken && !!user);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);