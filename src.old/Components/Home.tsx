/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import VideoData from "../Types/VideoData";

function Home(): JSX.Element {
  const [videosList, setVideosList] = useState([] as VideoData[]);

  const db = getFirestore();
  const videosRef = collection(db, "videos");

  useEffect(() => {
    getDocs(videosRef)
      .then(snapshot => {
        const videos = snapshot.docs.map(docmnt =>
          docmnt.data()
        ) as VideoData[];

        setVideosList(videos);
      })
      .catch(err => {
        // console.log(err.message);
      });
  }, []);

  return (
    <div className="flex flex-wrap items-start justify-start gap-2 p-10 mx-auto overflow-x-hidden overflow-y-scroll ">
      {videosList.map((video, i) => (
        <div
          className={`" sm:w-[23em] hover:scale-[1.02] active:scale-[.995] transition-all animate-reveal opacity-0"`}
          key={video.id}
          style={{
            animationDelay: `${i * 0.05}s`,
          }}
        >
          <Link to={`/video/${video.id}`}>
            <div className="overflow-hidden dark:bg-[#27242b] dark:text-white  rounded-lg shadow-lg ">
              <ReactPlayer
                url={video.url}
                width="100%"
                height="100%"
                className="overflow-hidden shadow-lg max-h-52 "
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
