import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from './UserContext';

const PrivateRoute = ({ children, allowedTypes }) => {
  const { user } = useUser();

  if (!user || !allowedTypes.includes(user.userType)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
