import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('username');

  if (!isAuthenticated) {
    localStorage.setItem('redirectTo', window.location.pathname);
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
