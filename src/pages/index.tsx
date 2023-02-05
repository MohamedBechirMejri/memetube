/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import type VideoData from "../../Types/VideoData";
import { type NextPage } from "next";

import Head from "next/head";
import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const Home: NextPage = () => {
  const [videosList, setVideosList] = useState([] as VideoData[]);

  const db = getFirestore();
  const videosRef = collection(db, "videos");

  useEffect(() => {
    getDocs(videosRef).then((snapshot) => {
      const videos = snapshot.docs.map((doc) => doc.data()) as VideoData[];
      setVideosList(videos);
    });
  }, []);

  return (
    <>
      <Head>
        <title>MemeTube</title>
        <meta name="description" content="top memes around the web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid h-full gap-8 overflow-y-scroll p-8 py-16 scrollbar-none">
        {videosList.map((video) => (
          <div
            key={video.id}
            className="elevation-12] grid h-max grid-rows-[auto,1fr,auto] place-items-center gap-4 rounded-xl py-8"
          >
            <h1 className="">{video.title}</h1>
            <video src={video.url} className="max-h-[75svh] w-full" />
          </div>
        ))}
      </main>
    </>
  );
};

export default Home;
