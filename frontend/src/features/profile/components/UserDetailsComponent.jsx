import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { SimpleTextField } from "../../../common/styles";
import FakeText from "../../../common/components/FakeText";

const UserDetailsComponent = (props) => {
  const { user, loading, onUserChange, onSave, onReset } = props;

  const { t } = useTranslation("common");

  if (loading)
    return (
      <>
        <FakeText lines={10} />
        <Divider variant="middle" sx={{ margin: 2 }} />
      </>
    );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" component="h2">
          {t("MyAccount.MyAccount")}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          name="username"
          label={t("MyAccount.Username")}
          value={user?.username}
          onChange={onUserChange}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          name="email"
          label={t("MyAccount.Email")}
          value={user?.email}
          onChange={onUserChange}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          name="firstName"
          label={t("MyAccount.FirstName")}
          value={user?.firstName}
          onChange={onUserChange}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          name="lastName"
          label={t("MyAccount.LastName")}
          value={user?.lastName}
          onChange={onUserChange}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          name="phoneNumber"
          label={t("MyAccount.PhoneNumber")}
          value={user?.phoneNumber}
          onChange={onUserChange}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <SimpleTextField
          fullWidth
          type="number"
          name="age"
          label={t("MyAccount.Age")}
          value={user?.age}
          onChange={onUserChange}
        />
      </Grid>
      <Grid item xs={12} container justifyContent="flex-end">
        <Button
          variant="contained"
          color="error"
          onClick={onReset}
          sx={{ mr: 1 }}
        >
          {t("MyAccount.Reset")}
        </Button>
        <Button variant="contained" color="success" onClick={onSave}>
          {t("MyAccount.Save")}
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Divider variant="middle" />
      </Grid>
      <Grid item xs={12} />
    </Grid>
  );
};

export default UserDetailsComponent;
