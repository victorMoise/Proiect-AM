import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4caf50",
      dark: "#388e3c",
    },
    secondary: {
      main: "#93c9a3",
    },
    background: {
      default: "#dcefe0",
      paper: "#c5dfcb",
    },
    text: {
      primary: "#0d3a10",
      secondary: "#388e3c",
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff",
      dark: "#808080",
    },
    secondary: {
      main: "#505050",
    },
    background: {
      default: "#2e2e2e",
      paper: "#626262",
    },
    text: {
      primary: "#ffffff",
      secondary: "#a8a8a8",
    },
    success: {
      main: "#1b5e20",
    },
    error: {
      main: "#b71c1c",
    },
  },
  shape: {
    borderRadius: 8,
  },
});
