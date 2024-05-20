"use client";

import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig, getCollection } from "~/lib/firebase";
import Reel from "./_components/Reel";
import { useUserStore } from "~/lib/globals/user";

export default function Home() {
  const [videos, setVideos] = useState<any[]>([]);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const { user } = useUserStore();

  useEffect(() => {
    console.log(user);
    getCollection(db, "videos").then((querySnapshot) => {
      const videos = querySnapshot.docs.map((doc) => doc.data());
      setVideos(videos);
    });
  }, []);

  return (
    <main className="h-full w-full snap-y snap-mandatory overflow-hidden overflow-y-scroll">
      {videos
        .filter((v) => {
          return true;
          if (!user) return true;
          // return !user.history.includes("videos/" + v.id);
        })
        .sort((a, b) => {
          return b.createdAt - a.createdAt;
        })
        .map((video) => (
          <Reel key={video.id} video={video} />
        ))}
    </main>
  );
}
