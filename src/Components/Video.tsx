import React from "react";
import { useParams } from "react-router-dom";
import Player from "./Video/Player";

function Video(): JSX.Element {
  const { videoId } = useParams();
  return (
    <div>
      <div>
        <Player />
      </div>
      <div>{/* related videos */}</div>
    </div>
  );
}

export default Video;
