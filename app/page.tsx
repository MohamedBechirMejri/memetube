"use client";

import { get, getDatabase, ref } from "firebase/database";
import { useEffect, useRef, useState } from "react";

import { getCollection } from "~/lib/firebase";
import Reel from "./(home)/Reel";

export default function Home() {
  const [videos, setVideos] = useState<any[]>([]);
  const videosSnapshotRef = useRef(null);

  getCollection("videos").then((querySnapshot) => {
    const videos = querySnapshot.docs.map((doc) => doc.data());
    // setVideos(videos);
    console.log(videos);
  });

  useEffect(() => {
    const db = getDatabase();
    const videosRef = ref(db, "videos");
    get(videosRef)
      .then((snapshot) => {
        const data = snapshot.val();
        if (!data) return;
        const videos = Object.values(data).sort(
          (a: any, b: any) => b.createdAt - a.createdAt,
        );
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
