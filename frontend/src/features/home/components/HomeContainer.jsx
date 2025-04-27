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
  const [isFavorite, setIsFavorite] = useState(false);
  const [ownedSongs, setOwnedSongs] = useState(false);
  const [currentSongUrl, setCurrentSongUrl] = useState(null);
  const [currentSongDetails, setCurrentSongDetails] = useState(null);

  useEffect(() => {
    const fetchSongsList = async () => {
      try {
        const url = fit(endpoints.songs.publicList, {
          onlyFavorites: isFavorite,
          onlyOwned: ownedSongs,
        });
        const songsList = await axiosInstance.get(url);

        setSongs(songsList.data);
      } catch (err) {
        showToast(err.message || t("Home.Songs.ErrorFetchingData"), "error");
      } finally {
        setLoading(false);
      }
    };

    fetchSongsList();
  }, [isFavorite, ownedSongs, showToast, t]);

  const handlePlayPause = useCallback((song) => {
    setQueue((prevQueue) => {
      if (!prevQueue.find((s) => s.id === song.id)) {
        return [song, ...prevQueue];
      }
      return prevQueue;
    });
    setQueueIndex(0);
  }, []);

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
    setQueue((prevQueue) => {
      if (!prevQueue.find((s) => s.id === song.id)) {
        return [...prevQueue, song];
      }
      return prevQueue;
    });
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

  const handleSetIsFavorite = useCallback((_event, value) => {
    setIsFavorite(value);
  }, []);

  const handleSetOwnedSongs = useCallback((_event, value) => {
    setOwnedSongs(value);
  }, []);

  const handleRemoveFromQueue = useCallback(
    (indexToRemove) => () => {
      if (indexToRemove === queueIndex) return;

      setQueueIndex((prevIndex) => {
        if (indexToRemove < prevIndex) {
          return prevIndex - 1;
        } else if (
          indexToRemove === prevIndex &&
          prevIndex === queue.length - 1
        ) {
          return prevIndex - 1;
        }
        return prevIndex;
      });

      const updatedQueue = queue.filter((_, index) => index !== indexToRemove);

      if (updatedQueue.length === 0) {
        setCurrentSongUrl(null);
        setCurrentSongDetails(null);
      }

      setQueue(updatedQueue);
    },
    [
      queue,
      queueIndex,
      setCurrentSongDetails,
      setCurrentSongUrl,
      setQueueIndex,
      setQueue,
    ]
  );

  return (
    <PageContent pageTitle={t("Sidebar.Home")}>
      <StyledCard>
        <HomeComponent
          songs={songs}
          loading={loading}
          onPlayPause={handlePlayPause}
          onFavoriteSong={handleFavoriteSong}
          onUnfavoriteSong={handleUnfavoriteSong}
          onAddToQueue={handleAddToQueue}
          isFavorite={isFavorite}
          ownedSongs={ownedSongs}
          onOwnedSongsChange={handleSetOwnedSongs}
          onIsFavoriteChange={handleSetIsFavorite}
        />
      </StyledCard>
      <MusicPlayer
        queue={queue}
        queueIndex={queueIndex}
        setQueueIndex={setQueueIndex}
        setCurrentSongUrl={setCurrentSongUrl}
        setCurrentSongDetails={setCurrentSongDetails}
        currentSongUrl={currentSongUrl}
        currentSongDetails={currentSongDetails}
        onRemoveFromQueue={handleRemoveFromQueue}
      />
      <Toast toast={toast} handleClose={handleClose} />
    </PageContent>
  );
};

export default HomeContainer;
