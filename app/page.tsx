"use client";

import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig, getCollection } from "~/lib/firebase";
import Reel from "./(home)/Reel";
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
  }, [db, user]);

  return (
    <main className="h-full w-full snap-y snap-mandatory overflow-y-scroll">
      {/* {videos.map((video) => (
        <Reel key={video.id} video={video} />
      ))} */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        WIP...
      </div>
    </main>
  );
}
