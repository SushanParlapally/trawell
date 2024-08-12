import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './Auth/useAuth';

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();
  const location = useLocation();

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Redirect based on user roles (if specified)
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
