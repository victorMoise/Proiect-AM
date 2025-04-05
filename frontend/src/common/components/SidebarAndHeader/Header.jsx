import React from "react";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { headerBackground, headerColor } from "../../../constants/colors";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@emotion/react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const Header = (props) => {
  const {
    isMobile,
    toggleSidebar,
    isOpen,
    pageTitle,
    isDarkMode,
    onSetIsDarkMode,
  } = props;
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: headerBackground,
        color: headerColor,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        width: isMobile ? "100%" : `calc(100% - ${isOpen ? 240 : 60}px)`,
        transition: "width 0.3s ease",
        boxShadow: "none",
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleSidebar}
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" noWrap component="div">
          {pageTitle}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginLeft: "auto",
            padding: 1,
          }}
        >
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={onSetIsDarkMode}
            size={30}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
