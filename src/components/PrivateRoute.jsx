
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation(); // Obtiene el objeto location actual
  console.log("Ubicación actual: "+location.pathname);
  if (!isAuthenticated) {
    // Redirecciona al login y guarda la ubicación actual
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;