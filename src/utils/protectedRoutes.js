import React from 'react';
import { useSelector  } from 'react-redux'
import { Navigate, Outlet } from 'react-router';

const ProtectedRoutes = () => {
    const { isLoggedIn } = useSelector((state) => state.authentication);

    return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoutes