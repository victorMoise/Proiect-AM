import { TextField } from "@mui/material";
import React from "react";
import PasswordField from "../../../common/components/PasswordField";
import { useTranslation } from "react-i18next";

const InputFields = ({ form, errors, handleChange }) => {
  const { t } = useTranslation("common");

  return (
    <>
      <TextField
        fullWidth
        margin="normal"
        type="text"
        label={t("InputFields.Username")}
        name="username"
        value={form.username}
        onChange={handleChange}
        required
        error={errors.username}
        helperText={errors.username ? t("Signup.Error.UsernameRequired") : ""}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: errors.username ? "red" : "",
            },
          },
        }}
      />
      <TextField
        fullWidth
        margin="normal"
        type="text"
        label={t("InputFields.Email")}
        name="email"
        value={form.email}
        onChange={handleChange}
        required
        error={errors.email}
        helperText={errors.email ? t("Signup.Error.EmailRequired") : ""}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: errors.email ? "red" : "",
            },
          },
        }}
      />
      <PasswordField
        title={t("InputFields.Password")}
        password={form.password}
        setPassword={(e) =>
          handleChange({
            target: { name: "password", value: e.target.value },
          })
        }
        error={errors.password}
        errorText={!form.password ? t("Signup.Error.PasswordRequired") : ""}
      />
      <PasswordField
        title={t("InputFields.ConfirmPassword")}
        password={form.confirmPassword}
        setPassword={(e) =>
          handleChange({
            target: { name: "confirmPassword", value: e.target.value },
          })
        }
        error={errors.confirmPassword}
        errorText={
          !form.confirmPassword ? t("Signup.Error.ConfirmPasswordRequired") : ""
        }
      />
    </>
  );
};

export default InputFields;
