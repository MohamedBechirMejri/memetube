import { collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

function Home(): JSX.Element {
  const [videosList, setVideosList] = useState(
    [] as {
      id: string;
      title: string;
      description: string;
      url: string;
      uploader: string;
      likes: number;
      dislikes: number;
      comments: object[];
      views: number;
      date: string;
    }[]
  );

  const db = getFirestore();
  const videosRef = collection(db, "videos");

  useEffect(() => {
    getDocs(videosRef)
      .then(snapshot => {
        const videos = snapshot.docs.map(doc => doc.data()) as {
          id: string;
          title: string;
          description: string;
          url: string;
          uploader: string;
          likes: number;
          dislikes: number;
          comments: object[];
          views: number;
          date: string;
        }[];

        setVideosList(videos);
      })
      .catch(err => {
        // console.log(err.message);
      });
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-start gap-2 p-10 overflow-x-hidden overflow-y-scroll ">
      {videosList.map((video, i) => (
        <div
          className={`" sm:w-[23em] hover:scale-[1.02] active:scale-[.995] transition-all animate-reveal opacity-0 "`}
          key={video.id}
          style={{
            animationDelay: `${i * 0.05}s`,
          }}
        >
          <Link to={`/video/${video.id}`}>
            <div className="overflow-hidden bg-[#000000aa] rounded-lg shadow-lg">
              <ReactPlayer
                url={video.url}
                width="100%"
                height="100%"
                className="overflow-hidden shadow-lg rounded-xl"
              />
              <div className="p-4">
                <h3 className="mb-2 font-semibold md:text-xl">{video.title}</h3>
                <p className="text-sm text-gray-400">{video.uploader}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
