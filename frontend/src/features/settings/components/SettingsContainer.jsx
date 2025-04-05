import React from "react";
import PageContent from "../../../common/components/PageContent";
import { useTranslation } from "react-i18next";
import { StyledCard } from "../../../common/styles";
import { Divider, Grid, Typography } from "@mui/material";
import LanguageSelector from "../../../common/components/LanguageSelector";

const SettingsContainer = () => {
  const { t } = useTranslation("common");

  return (
    <PageContent pageTitle={t("Sidebar.Settings")}>
      <StyledCard>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">{t("Settings.Settings")}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider
              variant="fullWidth"
              sx={{ marginBottom: 2, marginTop: 2 }}
            />
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={3} md={2} lg={1}>
                <Typography variant="body1">
                  {t("Settings.Language")}:
                </Typography>
              </Grid>
              <Grid item xs={9} md={10} lg={11}>
                <LanguageSelector />
              </Grid>
            </Grid>
            <Divider
              variant="fullWidth"
              sx={{ marginBottom: 2, marginTop: 2 }}
            />
          </Grid>
        </Grid>
      </StyledCard>
    </PageContent>
  );
};

export default SettingsContainer;
