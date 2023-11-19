import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userAuthenticated } from '../app/authenticationSlice';
import { Navigate, Outlet } from 'react-router';

const ProtectedRoutes = () => {
    const { isLoggedIn } = useSelector((state) => state.authenticationslice);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token !== undefined && token !== null) {
            dispatch(userAuthenticated({ token: token }))
        }
    }, [dispatch]);

    return isLoggedIn ? <Outlet /> : <Navigate to='/login' />;
}

export default ProtectedRoutes