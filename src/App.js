import React, { useMemo } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Public/Login';
import LandingPage from './pages/Public/LandingPage';
import RegisterAlumni from './pages/Public/RegisterAlumni';
import RegisterCompany from './pages/Public/RegisterCompany';
import ForgotPassword from './pages/Public/ForgotPassword';
import UnprotectedRoutes from './utils/unProtectedRoutes';
import ChangePassword from './pages/Public/ChangePassword';
import Layout from './pages/Admin/Layout';
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Dashboard from './pages/Admin/Dashboard';
import Jobs from './pages/Admin/Jobs';
import VerifyCompany from './pages/Admin/VerifyCompany';
import Companies from './pages/Admin/Company';
import Alumni from './pages/Admin/Alumni';
import ProtectedRoutes from './utils/protectedRoutes';
import ViewCandidates from './pages/Admin/ViewCandidates';
import PendingJobs from './pages/Admin/PendingJobs';
import FAQ from './pages/Admin/FAQ';
import Events from './pages/Admin/Events';
import Announcements from './pages/Admin/Announcement';


const App = () => {
  const { theme, toggleColorMode } = useMode();

  const colorModeContextValue = useMemo(
    () => ({
      toggleColorMode: toggleColorMode,
    }),
    [toggleColorMode]
  );


  return (
    <ColorModeContext.Provider value={colorModeContextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <BrowserRouter>
            {/* <Navbar /> */}

            <Routes>
              <Route path="*" element={<h2>Page not found!</h2>} />

              <Route element={<UnprotectedRoutes />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signin" exact element={<Login />} />
                <Route path="/signup" element={<RegisterAlumni />} />
                <Route path="/signup/company" element={<RegisterCompany />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/changepassword" element={<ChangePassword />} />
              </Route>

              {/* 
        <Route path="/dashboard" element={isLoggedIn ? <ChangePassword /> : <Login />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to='/dashboard' /> : <Login />} />
        <Route path="/register" element={isLoggedIn ? <Navigate to='/dashboard' /> : <RegisterAlumni />} />
        <Route path="*" element={<h2>Page not found!</h2>} />
      */}

              <Route element={<Layout />}>
                <Route element={<ProtectedRoutes />}>
                  <Route path="/admin" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/verification_company" element={<VerifyCompany />} />
                  <Route path="/companies" element={<Companies />} />
                  <Route path="/jobs" element={<Jobs />} />
                  <Route path="/view_candidates" element={<ViewCandidates />} />
                  <Route path="/pending_jobs" element={<PendingJobs />} />
                  <Route path="/alumni" element={<Alumni />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/announcement" element={<Announcements />} />

                </Route>
              </Route>


              {/* route for user  */}

            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider >
  );
}

export default App;
