import React from "react";
import { Grid, Typography } from "@mui/material";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { StyledCard } from "../../styles";

const MusicPlayer = ({ songUrl, songDetails, onEnd }) => {
  if (!songUrl) return null;

  return (
    <StyledCard>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold">
            {songDetails.artist} - {songDetails.title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <AudioPlayer
            key={songUrl}
            autoPlay
            src={songUrl}
            onEnded={onEnd}
            showJumpControls
            customAdditionalControls={[]}
            style={{ width: "auto", borderRadius: 10, bottom: 0 }}
          />
        </Grid>
      </Grid>
    </StyledCard>
  );
};

export default MusicPlayer;
