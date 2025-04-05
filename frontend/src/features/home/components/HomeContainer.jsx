import React from "react";
import { useTranslation } from "react-i18next";
import PageContent from "../../../common/components/PageContent";
import { Box, Typography } from "@mui/material";

const HomeContainer = () => {
  const { t } = useTranslation("common");
  return (
    <PageContent pageTitle={t("Sidebar.Home")}>
      <Box sx={{ height: "2000px", padding: 2 }}>
        <Typography variant="body1">
          This is some placeholder content to make the page longer vertically.
        </Typography>
        {/* Add more content or elements here as needed */}
      </Box>
    </PageContent>
  );
};

export default HomeContainer;
