import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
import CompanyLandingPage from '../pages/Company/CompanyLandingPage';
import AlumniLandingPage from '../pages/Alumni/AlumniLandingPage';

const ProtectedRoutes = () => {
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
      content = <Outlet />
      break;
    default:
      content = <Navigate to="/" />;
      break;
  }

  return isSucceed ? content : <Navigate to="/" />;
};

export default ProtectedRoutes;