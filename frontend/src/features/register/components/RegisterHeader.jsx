import { Grid, Typography } from "@mui/material";
import React from "react";
import LanguageSelector from "../../../common/components/LanguageSelector";

const Header = ({ t }) => (
  <Grid container>
    <Grid item container xs={6} alignItems="center">
      <Typography variant="h5" component="h2" gutterBottom>
        {t("Signup.Signup")}
      </Typography>
    </Grid>
    <Grid item container xs={6} justifyContent="flex-end" alignItems="center">
      <LanguageSelector />
    </Grid>
  </Grid>
);

export default Header;
