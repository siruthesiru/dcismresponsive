import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import AccountVerify from '../components/accountverify/index';

const UnprotectedRoute = () => {
  const { isSucceed, role, isAlumni } = useSelector((state) => state.authentication);

  let content;
  switch (role) {
    case 'ALUMNI':
      content = <Navigate to="/alumni/dashboard" />;
      break;
    case 'COMPANY':
      content = <Navigate to="/company/dashboard" />;
      break;
    case 'ADMIN':
      content = <Navigate to="/admin/dashboard" />;
      break;
    default:
      content = <Outlet />;
      break;
  }

  return isSucceed ? content : <Outlet />;
};

export default UnprotectedRoute;