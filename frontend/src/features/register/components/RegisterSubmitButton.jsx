import { Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const SubmitButton = ({ handleSubmit, t }) => (
  <>
    <Button
      fullWidth
      type="submit"
      variant="contained"
      color="primary"
      sx={{ marginTop: 2, marginBottom: 2 }}
      onClick={handleSubmit}
    >
      {t("Signup.Signup")}
    </Button>
    <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
      {t("Signup.AlreadyHaveAnAccount")}{" "}
      <Link to={"/"}>{t("Signup.Login")}</Link>
    </Typography>
  </>
);

export default SubmitButton;
