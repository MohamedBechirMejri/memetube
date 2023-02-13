import type VideoData from "../../types/VideoData";
import { type NextPage } from "next";

import Head from "next/head";
import { useEffect, useState } from "react";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import Video from "../components/Video";
import Buttons from "../components/Buttons";
import Link from "next/link";

const Home: NextPage = () => {
  const [videosList, setVideosList] = useState([] as VideoData[]);
  const [db] = useState(getFirestore());

  useEffect(() => {
    const videosRef = collection(db, "videos");
    const unsubscribe = onSnapshot(videosRef, (snapshot) => {
      const videos = snapshot.docs.map((doc) => doc.data()) as VideoData[];
      setVideosList(videos);
    });

    return () => unsubscribe();
  }, [db]);

  return (
    <>
      <Head>
        <title>MemeTube</title>
        <meta name="description" content="Top memes around the web" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="grid h-full place-items-center overflow-y-scroll font-[Nunito] scrollbar-none">
        {videosList.map((video) => (
          <div
            key={video.id}
            className="grid h-[calc(100svh)] w-full grid-rows-[auto,1fr,auto] overflow-hidden bg-white p-4 py-14"
          >
            <div className="p-4 capitalize">
              <h1 className="text-2xl font-bold">{video.title}</h1>
              <Link
                href={"/u/" + video.uploader.id}
                className="text-sm contrast-[.25] hover:underline"
              >
                {video.uploader.displayName}
              </Link>
            </div>
            <Video src={video.url} />
            <Buttons
              id={video.id}
              likes={video.likes}
              comments={video.comments}
              db={db}
            />
          </div>
        ))}
      </main>
    </>
  );
};

export default Home;
