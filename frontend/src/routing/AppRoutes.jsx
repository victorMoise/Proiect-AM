import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import LoginForm from "../features/login/components/LoginFormContainer";
import { useAuth } from "../contexts/AuthContext";
import HomeContainer from "../features/home/components/HomeContainer";
import RegisterForm from "../features/register/components/RegisterContainer";
import ProfileContainer from "../features/profile/components/ProfileContainer";
import SettingsContainer from "../features/settings/components/SettingsContainer";

const AppRoutes = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const savedPath = localStorage.getItem("currentPath");
    if (isAuthenticated && savedPath && savedPath !== location.pathname) {
      navigate(savedPath, { replace: true });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("currentPath", location.pathname);
    }
  }, [isAuthenticated, location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route
        path="/home"
        element={<ProtectedRoute element={<HomeContainer />} />}
      />
      <Route
        path="/profile"
        element={<ProtectedRoute element={<ProfileContainer />} />}
      />
      <Route
        path="/settings"
        element={<ProtectedRoute element={<SettingsContainer />} />}
      />
    </Routes>
  );
};

export default AppRoutes;
