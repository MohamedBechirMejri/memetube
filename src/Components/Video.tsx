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
        <Player
          url={
            // TODO: get video url from backend
            "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          }
        />
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
/**
 * Test Videos
const images = [
	"https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
	"https://storage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
	"https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
	"https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg",
	"https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg",
	"https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg",
	"https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg",
	"https://storage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
	"https://storage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg",
	"https://storage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg"
]

const videos = [
	"https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
	"https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
	"https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
	"https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
	"https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
	"https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
	"https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
	"https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.jpg",
	"https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
	"https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
]
 */
