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
    getDocs(videosRef)
      .then((snapshot) => {
        const videos = snapshot.docs.map((doc) => doc.data()) as VideoData[];
        setVideosList(videos);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>MemeTube</title>
        <meta name="description" content="top memes around the web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid h-full place-items-center gap-8 overflow-y-scroll p-8 font-[Nunito] capitalize scrollbar-none">
        <h1 className="p-4 text-3xl">MemeTube</h1>
        {videosList.map((video) => (
          <div
            key={video.id}
            className="grid h-[min(35rem,70svh)] w-full cursor-pointer grid-rows-[auto,1fr,auto] overflow-hidden rounded-2xl border elevation-4 bg-white"
          >
            <div className="p-4 elevation-4">
              <h1 className="text-2xl font-bold">{video.title}</h1>
              <p className="text-sm">{video.description}</p>
            </div>
            <div className="flex h-full bg-black justify-center items-center overflow-auto">
              <video src={video.url} className="h-full"></video>
            </div>
            <div className="grid grid-cols-3">
              <button className="p-4 text-sm">50 haha</button>
              <button className="p-4 text-sm">10 comment</button>
              <button className="p-4 text-sm">550 share</button>
            </div>
          </div>
        ))}
      </main>
    </>
  );
};

export default Home;
