import React from "react";
import { useParams } from "react-router-dom";
import Player from "./Video/Player";
import RelatedVideos from "./Video/RelatedVideos";
import ToolBox from "./Video/ToolBox";
import Comments from "./Video/Comments";
import Details from "./Video/Details";

function Video(): JSX.Element {
  const { videoId } = useParams();
  return (
    <div>
      <div>
        <Player />
        <div>
          <div>
            <h1>video title</h1>
            <p>views count</p>
          </div>
          <ToolBox />
        </div>
        <hr />
        <Details />
        <hr />
        <Comments />
      </div>
      <RelatedVideos />
    </div>
  );
}

export default Video;
