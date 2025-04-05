import { Card, Grid } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import useToast from "../../../hooks/useToast";
import Toast from "../../../common/components/Toast";
import { useNavigate } from "react-router-dom";
import Header from "./RegisterHeader";
import InputFields from "./RegisterInputFields";
import SubmitButton from "./RegisterSubmitButton";
import { endpoints } from "../../../utils/endpoints";
import { axiosInstance } from "../../../utils/axios";

const RegisterForm = () => {
  const { t } = useTranslation("common");
  const { toast, showToast, handleClose } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { username, email, password, confirmPassword } = form;

      if (!username || !email || !password || !confirmPassword) {
        setErrors({
          username: !username,
          email: !email,
          password: !password,
          confirmPassword: !confirmPassword,
        });

        showToast(
          t(
            !username && !email && !password && !confirmPassword
              ? "Signup.Error.AllFieldsRequired"
              : !username
              ? "Signup.Error.UsernameRequired"
              : !email
              ? "Signup.Error.EmailRequired"
              : !password
              ? "Signup.Error.PasswordRequired"
              : "Signup.Error.ConfirmPasswordRequired"
          ),
          "error"
        );
        return;
      }

      if (password !== confirmPassword) {
        setErrors((prev) => ({
          ...prev,
          password: true,
          confirmPassword: true,
        }));
        showToast(t("Signup.Error.PasswordsDoNotMatch"), "error");
        return;
      }

      try {
        await axiosInstance.post(endpoints.auth.register, {
          username,
          email,
          password,
        });

        showToast(t("Signup.AccountCreated"), "success");

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error) {
        const errorMessage = error.message || t("General.Error");
        showToast(errorMessage, "error");
        setErrors({
          username: true,
          email: true,
          password: true,
          confirmPassword: true,
        });
      }
    },
    [form, navigate, showToast, t]
  );

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "75vh" }}
    >
      <Grid
        item
        xs={12}
        sm={8}
        md={4}
        sx={{ maxWidth: "700px", width: "100%" }}
      >
        <Card
          sx={{
            padding: 4,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "#ffffff",
          }}
        >
          <Header t={t} />
          <InputFields
            form={form}
            errors={errors}
            handleChange={handleChange}
          />
          <SubmitButton handleSubmit={handleSubmit} t={t} />
        </Card>
      </Grid>
      <Toast toast={toast} handleClose={handleClose} />
    </Grid>
  );
};

export default RegisterForm;
