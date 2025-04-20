import React from "react";
import PageContent from "../../../common/components/PageContent";
import { useTranslation } from "react-i18next";
import ListContainer from "./ListContainer";
import UploadContainer from "./UploadContainer";

const MyMusicContainer = () => {
  const { t } = useTranslation("common");  

  return (
    <PageContent pageTitle={t("Sidebar.MyMusic")}>
      <UploadContainer />
      <ListContainer />
    </PageContent>
  );
};

export default MyMusicContainer;
