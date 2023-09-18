import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { userAuthenticated } from '../app/authenticationSlice';

const UnprotectedRoutes = () => {
  const { token } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      dispatch(userAuthenticated({ token: storedToken }));
    }
  }, [dispatch]);

  return token ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default UnprotectedRoutes;
