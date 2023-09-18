import { React, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, Outlet } from 'react-router';
import { userAuthenticated } from '../app/authenticationSlice';

const ProtectedRoutes = () => {
  const { isLoggedIn } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token !== undefined && token !== null) {
      dispatch(userAuthenticated({ token: token }))
    }
  }, [dispatch]);


  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoutes