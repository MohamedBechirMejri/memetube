"use client";

import { getDatabase, ref, onValue, get } from "firebase/database";
import { useState, useRef, useEffect } from "react";

import Reel from "./(home)/Reel";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "~/lib/firebase";

initializeApp(firebaseConfig);

export default function Home() {
  const [videos, setVideos] = useState<any[]>([]);
  const videosSnapshotRef = useRef(null);

  useEffect(() => {
    const db = getDatabase();
    const videosRef = ref(db, "videos");
    get(videosRef)
      .then((snapshot) => {
        const data = snapshot.val();
        if (!data) return;
        const videos = Object.values(data).reverse();
        setVideos(videos);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <main className="h-full w-full snap-y snap-mandatory overflow-y-scroll">
      {videos.map((video) => (
        <Reel key={video.key} video={video} />
      ))}
    </main>
  );
}
