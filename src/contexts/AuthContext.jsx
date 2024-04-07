import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({ isAuthenticated: false, setIsAuthenticated: () => {} });

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // TODO: cambiar para obtener token de cookies
    const token = localStorage.getItem("token");
    console.log("Token obtenido: "+token);
    setIsAuthenticated(!!token);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);