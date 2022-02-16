import React from "react";
import ReactPlayer from "react-player";

function Player({ url }: { url: string }): JSX.Element {
  return (
    <div className="overflow-hidden rounded-lg">
      <ReactPlayer playing controls url={url} />
    </div>
  );
}

export default Player;
