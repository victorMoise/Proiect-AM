import React, { useEffect } from "react";
import { Box, ThemeProvider } from "@mui/material";
import SidebarAndHeader from "./SidebarAndHeader/SidebarAndHeader";
import { pageBackground } from "../../constants/colors";
import { darkTheme, lightTheme } from "../../theme";
import useDarkMode from "../../hooks/useDarkMode";

const PageContent = ({ pageTitle, children }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    const scrollbarStyle = document.documentElement.style;

    if (isDarkMode) {
      scrollbarStyle.setProperty("--scrollbar-bg", "#333");
      scrollbarStyle.setProperty("--scrollbar-thumb", "#888");
    } else {
      scrollbarStyle.setProperty("--scrollbar-bg", "#f1f1f1");
      scrollbarStyle.setProperty("--scrollbar-thumb", "#888");
    }
  }, [isDarkMode]);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "100vh",
          backgroundColor: pageBackground,
        }}
      >
        <SidebarAndHeader
          pageTitle={pageTitle}
          onSetIsDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
        />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            marginTop: { xs: "56px", sm: "64px" },
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "var(--scrollbar-thumb) var(--scrollbar-bg)",
          }}
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default PageContent;
