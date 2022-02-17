import React from "react";
import ReactPlayer from "react-player";

function Player({ url }: { url: string }): JSX.Element {
  return (
    <ReactPlayer
      playing
      controls
      url={url}
      width="100%"
      height="100%"
      borderRadius="2em"
      className="overflow-hidden shadow-lg rounded-xl"
    />
  );
}

export default Player;
