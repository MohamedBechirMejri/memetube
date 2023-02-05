/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import VideoData from "../../Types/VideoData";

function Home(): JSX.Element {
  const [videosList, setVideosList] = useState([] as VideoData[]);

  const db = getFirestore();
  const videosRef = collection(db, "videos");

  useEffect(() => {
    getDocs(videosRef)
      .then((snapshot) => {
        const videos = snapshot.docs.map((docmnt) =>
          docmnt.data()
        ) as VideoData[];

        setVideosList(videos);
      })
      .catch((err) => {
        // console.log(err.message);
      });
  }, []);

  return (
    <div className="mx-auto flex flex-wrap items-start justify-start gap-2 overflow-x-hidden overflow-y-scroll p-10 ">
      {videosList.map((video, i) => (
        <div
          className={`" animate-reveal opacity-0" transition-all hover:scale-[1.02] active:scale-[.995] sm:w-[23em]`}
          key={video.id}
          style={{
            animationDelay: `${i * 0.05}s`,
          }}
        >
          <Link to={`/video/${video.id}`}>
            <div className="overflow-hidden rounded-lg shadow-lg  dark:bg-[#27242b] dark:text-white ">
              <ReactPlayer
                url={video.url}
                width="100%"
                height="100%"
                className="max-h-52 overflow-hidden shadow-lg "
              />
              <div className="p-4">
                <h3 className="mb-2 font-semibold md:text-xl ">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-400 ">
                  {video.uploader.displayName}
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
