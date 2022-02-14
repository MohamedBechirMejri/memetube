import React from "react";
import { useParams } from "react-router-dom";
import Player from "./Video/Player";
import RelatedVideos from './Video/RelatedVideos';

function Video(): JSX.Element {
  const { videoId } = useParams();
  return (
    <div>
      <div>
        <Player />
      </div>
    <RelatedVideos />
    </div>
  );
}

export default Video;
