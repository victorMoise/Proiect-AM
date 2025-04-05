import {
  Autocomplete,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import FakeText from "../../../common/components/FakeText";

const AddressDetailsComponent = (props) => {
  const { t } = useTranslation("common");
  const {
    loading,
    address,
    onAddressChange,
    countries,
    cities,
    onCountryChange,
    onCityChange,
    onSave,
    onReset,
  } = props;

  if (loading) return <FakeText lines={10} />;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" component="h2">
          {t("MyAccount.Address.Address")}
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <Autocomplete
          fullWidth
          options={countries}
          value={address?.country}
          getOptionLabel={(option) => option.name}
          onChange={onCountryChange}
          disabled={!!address?.city}
          renderInput={(params) => (
            <TextField {...params} label={t("MyAccount.Address.Country")} />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Autocomplete
          fullWidth
          options={cities}
          value={address?.city}
          getOptionLabel={(option) => option.name}
          onChange={onCityChange}
          renderInput={(params) => (
            <TextField {...params} label={t("MyAccount.Address.City")} />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          name="street"
          label={t("MyAccount.Address.Street")}
          value={address?.street}
          onChange={onAddressChange}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          name="details"
          label={t("MyAccount.Address.Details")}
          value={address?.details}
          onChange={onAddressChange}
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
    </Grid>
  );
};

export default AddressDetailsComponent;
