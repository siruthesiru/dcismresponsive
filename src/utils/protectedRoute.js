import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = ({ userRole }) => {
  const { isSucceed, role } = useSelector((state) => state.authentication);

  const isAuthorized = role === userRole;

  if (!isAuthorized || !isSucceed) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;