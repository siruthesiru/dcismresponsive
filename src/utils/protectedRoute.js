import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
import AccountVerify from '../components/accountverify/index';
import { clearAccount } from "../app/authenticationSlice";

const ProtectedRoute = ({ userRole, userVerified  }) => {
  const { isSucceed, role, isAlumni } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  const isAuthorized = role === userRole;
  const isVerified = isAlumni === userVerified;

  if(isAlumni === false)
  {
    if (!isAuthorized || !isSucceed) {
      return <Navigate to="/" />;
    }else {
      return <AccountVerify />
    }
  }else {
    if(isAlumni === true)
    {
      return <Outlet />;
    }else {
        dispatch(clearAccount());
        window.location.reload();
    }
  }
};

export default ProtectedRoute;