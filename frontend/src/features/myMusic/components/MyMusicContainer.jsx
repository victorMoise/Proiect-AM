import React, { useCallback, useState } from "react";
import PageContent from "../../../common/components/PageContent";
import { useTranslation } from "react-i18next";
import ListContainer from "./ListContainer";
import UploadContainer from "./UploadContainer";

const MyMusicContainer = () => {
  const { t } = useTranslation("common");
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = useCallback(() => setRefreshKey((prev) => prev + 1), []);

  return (
    <PageContent pageTitle={t("Sidebar.MyMusic")}>
      <UploadContainer onUploadSuccess={triggerRefresh} />
      <ListContainer refreshKey={refreshKey}/>
    </PageContent>
  );
};

export default MyMusicContainer;
