import type VideoData from "../../Types/VideoData";
import { type NextPage } from "next";

import Head from "next/head";
import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import Video from "../components/Video";

const Home: NextPage = () => {
  const [videosList, setVideosList] = useState([] as VideoData[]);

  const db = getFirestore();
  const videosRef = collection(db, "videos");

  useEffect(() => {
    const videos = [
      {
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        views: [],
        dislikes: [],
        uploader: {
          id: "xvlvn3KIxNOnLvtuQwYgLLpNk8W2",
          photoURL:
            "https://lh3.googleusercontent.com/a/AATXAJw8kD3q5WR2l50wOH6pwk25Xi_XoW9CI90WDp3s=s96-c",
          displayName: "Mohamed Bechir Mejri",
        },
        comments: [],
        description: "first video",
        title: "ahom ahom",
        id: "l0gfjamx",
        date: "2022-03-07T08:17:26.929Z",
        likes: [
          "l2ysXX5DPnT5kj43DPOB5SBLPGp1",
          "xvlvn3KIxNOnLvtuQwYgLLpNk8W2",
          "ZFQCf3r7ysOrT4f7pqOeiste8tn1",
        ],
      },
      {
        description: "second test video",
        title: "i'm gay i'm gay",
        date: "2022-03-07T08:18:42.475Z",
        dislikes: [],
        id: "l0gfllab",
        comments: [],
        uploader: {
          displayName: "Mohamed Bechir Mejri",
          photoURL:
            "https://lh3.googleusercontent.com/a/AATXAJw8kD3q5WR2l50wOH6pwk25Xi_XoW9CI90WDp3s=s96-c",
          id: "xvlvn3KIxNOnLvtuQwYgLLpNk8W2",
        },
        likes: [],
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        views: [],
      },
      {
        comments: [],
        likes: ["xvlvn3KIxNOnLvtuQwYgLLpNk8W2", "l2ysXX5DPnT5kj43DPOB5SBLPGp1"],
        description: "Test 3 ",
        id: "l0gfziys",
        date: "2022-03-07T08:29:31.215Z",
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        title: "Glace wel bira3",
        views: [],
        dislikes: [],
        uploader: {
          photoURL:
            "https://lh3.googleusercontent.com/a/AATXAJwTIYWhFFJ0Pij0yY5XcM0Io49QrU8Rn1Bj-5x5=s96-c",
          displayName: "Mohamed Bechir Mejri",
          id: "l2ysXX5DPnT5kj43DPOB5SBLPGp1",
        },
      },
      {
        id: "l0gnyohw",
        date: "2022-03-07T12:12:59.625Z",
        views: [],
        dislikes: [],
        comments: [],
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        uploader: {
          displayName: "Mohamed Bechir Mejri",
          photoURL:
            "https://lh3.googleusercontent.com/a/AATXAJwTIYWhFFJ0Pij0yY5XcM0Io49QrU8Rn1Bj-5x5=s96-c",
          id: "l2ysXX5DPnT5kj43DPOB5SBLPGp1",
        },
        description: "Lol",
        title: ".",
        likes: ["l2ysXX5DPnT5kj43DPOB5SBLPGp1"],
      },
    ];

    setVideosList(videos);

    // getDocs(videosRef)
    //   .then((snapshot) => {
    //     const videos = snapshot.docs.map((doc) => doc.data()) as VideoData[];

    //     setVideosList(videos);
    //   })
    //   .catch((error) => {
    //     console.log("Error getting documents: ", error);
    //   });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>MemeArchive</title>
        <meta name="description" content="Top memes around the web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid h-full place-items-center overflow-y-scroll font-[Nunito] capitalize scrollbar-none">
        {/* <h1 className="p-4 text-3xl">MemeTube</h1> */}
        {videosList.map((video) => (
          <div
            key={video.id}
            className="relative grid h-[100svh] w-full cursor-pointer overflow-hidden bg-black pb-[5rem] elevation-4"
          >
            <div className="absolute p-4">
              <h1 className="text-2xl font-bold">{video.title}</h1>
              <p className="text-sm">{video.description}</p>
            </div>
            <Video src={video.url} />
            <div className="absolute bottom-[10rem] right-2 z-40 grid grid-rows-3 gap-4 text-white">
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
