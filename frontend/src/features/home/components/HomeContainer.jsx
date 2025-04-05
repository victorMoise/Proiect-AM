import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PageContent from "../../../common/components/PageContent";
import HomeComponent from "./HomeComponent";
import { axiosInstance } from "../../../utils/axios";
import { endpoints } from "../../../utils/endpoints";
import Toast from "../../../common/components/Toast";
import useToast from "../../../hooks/useToast";
import { StyledCard } from "../../../common/styles";

const HomeContainer = () => {
  const { t } = useTranslation("common");
  const { toast, showToast, handleClose } = useToast();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playingSongId, setPlayingSongId] = useState(null);
  
  useEffect(() => {
    const fetchSongsList = async () => {
      try {
        const songsList = await axiosInstance.get(endpoints.songs.publicList);

        setSongs(songsList.data);
      } catch (err) {
        showToast(err.message || t("MyAccount.Error.FetchingData"), "error");
      } finally {
        setLoading(false);
      }
    };

    fetchSongsList();
  }, [showToast, t]);

  const handlePlayPause = useCallback(
    (songId) => {
      if (playingSongId === songId) {
        setPlayingSongId(null);
      } else {
        setPlayingSongId(songId);
      }
    },
    [playingSongId]
  );

  return (
    <PageContent pageTitle={t("Sidebar.Home")}>
      <StyledCard>
        <HomeComponent songs={songs} loading={loading} playingSongId={playingSongId} onPlayPause={handlePlayPause} />
      </StyledCard>
      <Toast toast={toast} handleClose={handleClose} />
    </PageContent>
  );
};

export default HomeContainer;
