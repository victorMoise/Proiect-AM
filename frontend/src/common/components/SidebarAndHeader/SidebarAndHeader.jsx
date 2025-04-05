import React, { useCallback, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import { useTheme } from "@mui/material/styles";
import { Logout } from "@mui/icons-material";
import { useAuth } from "../../../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";

const SidebarAndHeader = (props) => {
  const { t } = useTranslation("common");
  const { pageTitle, onSetIsDarkMode, isDarkMode } = props;
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const menuItems = [
    {
      label: `${t("Sidebar.Home")}`,
      icon: <HomeIcon />,
      onClick: () => {
        navigate("/home");
      },
    },
    {
      label: `${t("Sidebar.MyAccount")}`,
      icon: <PersonIcon />,
      onClick: () => {
        navigate("/profile");
      },
    },
    {
      label: `${t("Sidebar.Settings")}`,
      icon: <SettingsIcon />,
      onClick: () => {
        navigate("/settings");
      },
    },
    {
      label: `${t("Sidebar.Logout")}`,
      icon: <Logout />,
      onClick: () => {
        logout();
      },
    }
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Header
        isMobile={isMobile}
        isOpen={isOpen}
        pageTitle={pageTitle}
        isDarkMode={isDarkMode}
        onSetIsDarkMode={onSetIsDarkMode}
        toggleSidebar={toggleSidebar}
      />
      <Sidebar
        isMobile={isMobile}
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        theme={theme}
        menuItems={menuItems}
      />
    </Box>
  );
};

export default SidebarAndHeader;
