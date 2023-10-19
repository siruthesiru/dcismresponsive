import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import AccountVerify from '../components/accountverify/index';

const UnprotectedRoute = () => {
  const { isSucceed, role, isAccess } = useSelector((state) => state.authentication);
  if(isAccess === false){
    return isSucceed ? <AccountVerify /> : <Outlet />;
  }else {
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
}
};

export default UnprotectedRoute;