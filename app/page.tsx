"use client";

import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig, getCollection } from "~/lib/firebase";
import Reel from "./(home)/Reel";

export default function Home() {
  const [videos, setVideos] = useState<any[]>([]);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  useEffect(() => {
    getCollection(db, "videos").then((querySnapshot) => {
      const videos = querySnapshot.docs.map((doc) => doc.data());
      setVideos(videos);
    });
  }, [db]);

  return (
    <main className="h-full w-full snap-y snap-mandatory overflow-y-scroll">
      {videos.map((video) => (
        <Reel key={video.id} video={video} />
      ))}
    </main>
  );
}
