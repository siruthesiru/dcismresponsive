import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';


const UnprotectedRoute = () => {
  const { isSucceed, role } = useSelector((state) => state.authentication);

  let content;
  switch (role) {
    case 'ALUMNI':
      content = <Navigate to="/user_dashboard" />;
      break;
    case 'COMPANY':
      content = <Navigate to="/company_dashboard" />;
      break;
    case 'ADMIN':
      content = <Navigate to="/admin_dashboard" />;
      break;
    default:
      content = <Outlet />;
      break;
  }

  return isSucceed ? content : <Outlet />;
};

export default UnprotectedRoute;