// PasswordField.js
import React, { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const PasswordField = ({
  title,
  errorText,
  password,
  setPassword,
  error: passwordError,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation("common");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <TextField
      fullWidth
      margin="normal"
      type={showPassword ? "text" : "password"}
      label={title}
      name="password"
      value={password}
      onChange={setPassword}
      required
      error={passwordError}
      helperText={passwordError ? errorText : ""}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: passwordError ? "red" : "",
          },
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              edge="end"
              aria-label={t("InputFields.TogglePasswordVisibility")}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordField;
