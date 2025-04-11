import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const MusicPlayer = ({ songUrl, onEnd, onClose }) => {
  if (!songUrl) return null;

  return (
    <AudioPlayer
      key={songUrl}
      autoPlay
      src={songUrl}
      onEnded={onEnd}
      showJumpControls
      customAdditionalControls={[]}
      style={{ margin: 15, width: "auto", borderRadius: 10, bottom: 0 }}
    />
  );
};

export default MusicPlayer;
