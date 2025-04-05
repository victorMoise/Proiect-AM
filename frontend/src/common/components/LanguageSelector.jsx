import React from "react";
import { FormControl, Select, MenuItem } from "@mui/material";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { t } = useTranslation("common");
  const { i18n } = useTranslation();

  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value);
    localStorage.setItem("language", event.target.value);
  };

  return (
    <FormControl variant="outlined" size="small">
      <Select value={i18n.language} onChange={handleChange} displayEmpty>
        <MenuItem value="en">
          <ReactCountryFlag
            countryCode="GB"
            svg
            style={{
              width: "1.5em",
              height: "1.5em",
              marginRight: "0.5em",
            }}
            title="GB"
          />
          {t("Language.English")}
        </MenuItem>
        <MenuItem value="ro" color="primary">
          <ReactCountryFlag
            countryCode="RO"
            svg
            style={{
              width: "1.5em",
              height: "1.5em",
              marginRight: "0.5em",
            }}
            title="RO"
          />
          {t("Language.Romanian")}
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
