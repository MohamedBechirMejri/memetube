import React from "react";
import { useParams } from "react-router-dom";

function Video(): JSX.Element {
  const { videoId } = useParams();
  return <div>{videoId}</div>;
}

export default Video;
