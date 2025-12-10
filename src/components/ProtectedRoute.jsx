import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
  if (!auth.isLoggedIn()) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoute;