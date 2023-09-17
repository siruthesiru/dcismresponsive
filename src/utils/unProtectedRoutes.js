// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Navigate, Outlet } from 'react-router-dom';
// import { userAuthenticated } from '../app/authenticationSlice';

// const UnprotectedRoutes = () => {
//     const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//     const user = useSelector((state) => state.auth.user);
//     const userRole = user ? user.role : null;

//     const roleToDashboardPath = {
//         admin: '/admin-dashboard',
//         alumni: '/alumni-dashboard',
//         company: '/company-dashboard',
//     };

//     const dashboardPath = roleToDashboardPath[userRole] || '/dashboard';

//     return isAuthenticated ? <Navigate to={dashboardPath} /> : <Outlet />;
// };

// export default UnprotectedRoutes;

import  React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const UnprotectedRoutes = () => {
    const { isSucceed } = useSelector(state => state.authentication);
    
    return isSucceed ? <Navigate to='/dashboard' /> : <Outlet />;
};

export default UnprotectedRoutes;