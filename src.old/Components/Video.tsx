/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDoc, getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Player from "./Video/Player";
import RelatedVideos from "./Video/RelatedVideos";
import ToolBox from "./Video/ToolBox";
import Comments from "./Video/Comments";
import Details from "./Video/Details";
import addCommasToNumber from "../Utils/addCommasToNumber";
import VideoData from "../../Types/VideoData";

function Video(): JSX.Element {
  const params = useParams();
  const [video, setVideo] = useState({
    id: "",
    title: "",
    description: "",
    url: "",
    uploader: {
      displayName: "",
      photoURL: "",
      id: "",
    },
    likes: [],
    dislikes: [],
    comments: [],
    views: [],
    date: "",
  } as VideoData);

  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  const getVideoData = (): void => {
    const id = params.videoId;
    const videoRef = doc(db, `videos`, id!);
    getDoc(videoRef).then((videoData) => setVideo(videoData.data() as any));
  };

  useEffect(() => {
    getVideoData();
    const unsub = (): void => {
      if (user === null) {
        return;
      }
      if (!video.views.includes(user.uid))
        setDoc(
          doc(db, "videos", video.id),
          {
            views: [...video.views, user!.uid],
          },
          { merge: true }
        );
    };
    return unsub;
  }, []);

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-screen max-w-[70em] flex-col gap-4">
        <div className="p-2">
          <Player url={video.url} />
        </div>
        <div className="flex items-center justify-between px-2">
          <div>
            <h1 className="font-medium text-[#e6e8e9]">{video.title}</h1>
            <p className="text-xs text-[#acb1b8] ">
              {addCommasToNumber(video.views.length || 0)} views
            </p>
          </div>
          <ToolBox video={video} getVideoData={getVideoData} />
        </div>
        <hr />
        <Details description={video.description} uploader={video.uploader.id} />
        <hr />
        {/* <Comments /> */}
      </div>
      <RelatedVideos />
    </div>
  );
}

export default Video;
