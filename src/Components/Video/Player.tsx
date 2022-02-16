import React from "react";
import ReactPlayer from "react-player";

function Player(): JSX.Element {
  return (
    <div>
      <ReactPlayer
        controls
        url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      />
    </div>
  );
}

export default Player;
