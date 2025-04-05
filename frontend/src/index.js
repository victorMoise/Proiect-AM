import React from "react";
import ReactDOM from "react-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import common_en from "./translations/en/common.json";
import common_ro from "./translations/ro/common.json";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routing/AppRoutes";
import { CssBaseline } from "@mui/material";

const savedLanguage = localStorage.getItem("language") || "en";

i18next.init({
  interpolation: { escapeValue: false },
  lng: savedLanguage,
  resources: {
    en: {
      common: common_en,
    },
    ro: {
      common: common_ro,
    },
  },
});

const App = () => {
  return (
    <I18nextProvider i18n={i18next}>
      <AuthProvider>
        <CssBaseline />
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </I18nextProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
