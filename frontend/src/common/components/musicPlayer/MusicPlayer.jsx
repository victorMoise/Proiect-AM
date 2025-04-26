import React, { useCallback, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { StyledCard } from "../../styles";
import { API_BASE_URL } from "../../../utils/axios";

const MusicPlayer = ({
  queue,
  queueIndex,
  setQueueIndex,
}) => {
  const [currentSongUrl, setCurrentSongUrl] = useState(null);
  const [currentSongDetails, setCurrentSongDetails] = useState(null);

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
  }, [queue, queueIndex]);

  const handleEnd = useCallback(() => {
    if (queue.length > 0 && queueIndex < queue.length - 1) {
      setQueueIndex((prev) => prev + 1);
    } else {
      setCurrentSongUrl(null);
      setCurrentSongDetails(null);
    }
  }, [queue.length, queueIndex, setQueueIndex]);

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
            showJumpControls
            style={{ width: "auto", borderRadius: 10, bottom: 0 }}
          />
        </Grid>
      </Grid>
    </StyledCard>
  );
};

export default MusicPlayer;
