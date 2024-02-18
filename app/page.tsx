"use client";

import { get, getDatabase, ref } from "firebase/database";
import { useEffect, useRef, useState } from "react";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig, getCollection } from "~/lib/firebase";
import { userSig } from "~/lib/signals/user";
import Reel from "./(home)/Reel";

export default function Home() {
  const [videos, setVideos] = useState<any[]>([]);
  const videosSnapshotRef = useRef(null);

  console.log(userSig.value);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  getCollection(db, "videos").then((querySnapshot) => {
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
