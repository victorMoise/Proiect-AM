import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PageContent from "../../../common/components/PageContent";
import HomeComponent from "./HomeComponent";
import { axiosInstance } from "../../../utils/axios";
import { endpoints, fit } from "../../../utils/endpoints";
import Toast from "../../../common/components/Toast";
import useToast from "../../../hooks/useToast";
import { StyledCard } from "../../../common/styles";
import MusicPlayer from "../../../common/components/musicPlayer/MusicPlayer";

const HomeContainer = () => {
  const { t } = useTranslation("common");
  const { toast, showToast, handleClose } = useToast();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [queue, setQueue] = useState([]);
  const [queueIndex, setQueueIndex] = useState(0);

  useEffect(() => {
    const fetchSongsList = async () => {
      try {
        const songsList = await axiosInstance.get(endpoints.songs.publicList);

        setSongs(songsList.data);
      } catch (err) {
        showToast(err.message || t("Home.Songs.ErrorFetchingData"), "error");
      } finally {
        setLoading(false);
      }
    };

    fetchSongsList();
  }, [showToast, t]);

  const handlePlayPause = useCallback(
    (song) => {
      setQueue((prevQueue) => [song, ...prevQueue]);
    },
    []
  );

  const handleFavoriteSong = useCallback(
    async (song) => {
      try {
        const url = fit(endpoints.songs.favorite, { songId: song.id });
        await axiosInstance.put(url);
        song.isFavorite = !song.isFavorite;
        showToast(t("Home.Songs.FavoriteAdded"), "success");
      } catch (err) {
        showToast(err.message || t("Home.Songs.ErrorFetchingData"), "error");
      }
    },
    [showToast, t]
  );

  const handleAddToQueue = useCallback((song) => {
    setQueue((prevQueue) => [...prevQueue, song]);
  }, []);

  const handleUnfavoriteSong = useCallback(
    async (song) => {
      try {
        const url = fit(endpoints.songs.unfavorite, { songId: song.id });
        await axiosInstance.put(url);
        song.isFavorite = !song.isFavorite;
        showToast(t("Home.Songs.FavoriteRemoved"), "success");
      } catch (err) {
        showToast(err.message || t("Home.Songs.ErrorFetchingData"), "error");
      }
    },
    [showToast, t]
  );

  return (
    <PageContent pageTitle={t("Sidebar.Home")}>
      <MusicPlayer
        queue={queue}
        queueIndex={queueIndex}
        setQueueIndex={setQueueIndex}
      />
      <StyledCard>
        <HomeComponent
          songs={songs}
          loading={loading}
          onPlayPause={handlePlayPause}
          onFavoriteSong={handleFavoriteSong}
          onUnfavoriteSong={handleUnfavoriteSong}
          onAddToQueue={handleAddToQueue}
        />
      </StyledCard>
      <Toast toast={toast} handleClose={handleClose} />
    </PageContent>
  );
};

export default HomeContainer;
