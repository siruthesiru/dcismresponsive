import React from "react";
import {
    Routes,
    Route,
} from "react-router-dom";
import LandingPage from "../pages/Public/LandingPage";
import Login from "../pages/Public/Login";
import RegisterAlumni from "../pages/Public/RegisterAlumni";
import RegisterCompany from "../pages/Public/RegisterCompany";
import UnprotectedRoutes from "../utils/unProtectedRoutes";
import ForgotPassword from "../pages/Public/ForgotPassword";

const AcesRoutes = () => {
    return (
        <div className="app">

            <Routes>
                <Route element={<UnprotectedRoutes />}>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" exact element={<Login />} />
                    <Route path="/register/alumni" element={<RegisterAlumni />} />
                    <Route path="/register/company" element={<RegisterCompany />} />
                    <Route path="/forgotpassword" element={<ForgotPassword />} />
                </Route>


                {/* Alumni routes */}
                <Route
                    path="/alumni"
                    element={
                        /* Your alumni-specific components and routes go here */
                        <Routes>
                            {/* Add alumni-specific routes */}
                        </Routes>
                    }
                />

                {/* Company routes */}
                <Route
                    path="/company"
                    element={
                        /* Your company-specific components and routes go here */
                        <Routes>
                            {/* Add company-specific routes */}
                        </Routes>
                    }
                />

                {/* Admin routes */}
                <Route
                    path="/admin"
                    element={
                        /* Your admin-specific components and routes go here */
                        <Routes>
                            {/* Add admin-specific routes */}
                        </Routes>
                    }
                />
            </Routes>
        </div >
    );
};

export default AcesRoutes;
