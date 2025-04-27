import React, { useCallback, useEffect } from "react";
import { Divider, Grid, IconButton, Typography } from "@mui/material";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { StyledCard } from "../../styles";
import { API_BASE_URL } from "../../../utils/axios";
import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";

const MusicPlayer = ({
  queue,
  queueIndex,
  setQueueIndex,
  setCurrentSongUrl,
  setCurrentSongDetails,
  currentSongUrl,
  currentSongDetails,
  onRemoveFromQueue,
}) => {
  const { t } = useTranslation("common");

  useEffect(() => {
    if (queue.length > 0 && queue[queueIndex]) {
      const song = queue[queueIndex];
      const url = `${API_BASE_URL}songs/play/${
        song.id
      }?token=${localStorage.getItem("token")}`;
      setCurrentSongUrl(url);
      setCurrentSongDetails({ title: song.title, artist: song.artist });
    } else {
      setCurrentSongUrl(null);
      setCurrentSongDetails(null);
    }
  }, [queue, queueIndex, setCurrentSongDetails, setCurrentSongUrl]);

  const handleEnd = useCallback(() => {
    if (queue.length > 0 && queueIndex < queue.length - 1) {
      setQueueIndex((prev) => prev + 1);
    } else {
      setCurrentSongUrl(null);
      setCurrentSongDetails(null);
    }
  }, [
    queue.length,
    queueIndex,
    setCurrentSongDetails,
    setCurrentSongUrl,
    setQueueIndex,
  ]);

  const handleClickNext = useCallback(() => {
    if (queue.length > 0 && queueIndex < queue.length - 1) {
      setQueueIndex((prev) => prev + 1);
    }
  }, [queue.length, queueIndex, setQueueIndex]);

  const handleClickPrevious = useCallback(() => {
    if (queue.length > 0 && queueIndex > 0) {
      setQueueIndex((prev) => prev - 1);
    }
  }, [queue.length, queueIndex, setQueueIndex]);

  if (!currentSongUrl) return null;
  return (
    <StyledCard>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold">
            {currentSongDetails?.artist} - {currentSongDetails?.title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <AudioPlayer
            key={currentSongUrl}
            autoPlay
            src={currentSongUrl}
            onEnded={handleEnd}
            showSkipControls={true}
            onClickNext={handleClickNext}
            onClickPrevious={handleClickPrevious}
            showJumpControls={false}
            progressJumpSteps={5000}
            style={{ width: "auto", borderRadius: 10, bottom: 0 }}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider variant="middle" sx={{ marginTop: 2, marginBottom: 2 }} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight="bold">
            {t("Home.Songs.Queue")}
          </Typography>
        </Grid>
        <Grid container spacing={1}>
          {queue.map((song, index) => (
            <Grid item xs={12} key={song.id} display="flex" alignItems="center">
              {index !== queueIndex && (
                <IconButton size="small" onClick={onRemoveFromQueue(index)}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              )}
              <Typography
                variant="body2"
                fontWeight={index === queueIndex ? "bold" : "normal"}
                sx={{ marginLeft: 1 }}
              >
                {song.artist} - {song.title}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </StyledCard>
  );
};

export default MusicPlayer;
