import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import CompanyLandingPage from '../pages/Company/CompanyLandingPage';
import AlumniLandingPage from '../pages/Alumni/AlumniLandingPage';

const UnprotectedRoute = () => {
  const { isSucceed, role } = useSelector((state) => state.authentication);

  // Define your condition for rendering based on the user's role
  let content;
  switch (role) {
    case 'ALUMNI':
      content = <AlumniLandingPage />;
      break;
    case 'COMPANY':
      content = <CompanyLandingPage />;
      break;
    case 'ADMIN':
      content = <Navigate to="/dashboard" />;
      break;
    default:
      content = <Navigate to="/dashboard" />;
      break;
  }

  return isSucceed ? content : <Outlet />;
};

export default UnprotectedRoute;