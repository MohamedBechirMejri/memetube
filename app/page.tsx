"use client";

import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { firebaseConfig } from "~/lib/firebase";
import { useUserStore } from "~/lib/globals/user";
import { useVideoStore } from "~/lib/globals/video";
import Reel from "../components/Reel";
import ActionBar from "../components/Reel/ActionBar";

export default function Home() {
  const [videos, setVideos] = useState<any[]>([]);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const { video } = useVideoStore();
  const { user } = useUserStore();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "videos"),
      (snapshot) => {
        const videos = snapshot.docs.map((doc) => doc.data());
        setVideos(videos);
      },
      (error) => console.error(error),
    );

    return () => unsubscribe();
  }, [db]);

  return (
    <main className="h-full w-full snap-y snap-mandatory overflow-hidden overflow-y-scroll">
      <ActionBar />

      {video && (
        <p className="absolute bottom-16 left-0 z-30 w-full bg-gradient-to-t from-slate-950 p-4 font-semibold">
          <span className="line-clamp-1 w-[65%]">{video.name}</span>
          <span className="items-center text-sm font-normal opacity-80">
            {new Date(video.createdAt).toDateString()} <br />
            {video.views.length} views
          </span>
        </p>
      )}

      {videos
        .filter((v) => {
          return true;
          if (!user) return true;
          // return !user.history.includes( v.id);
        })
        .sort((a, b) => {
          return b.createdAt - a.createdAt;
        })
        .map((video, i) => (
          <Reel key={video.id} video={video} i={i} />
        ))}
    </main>
  );
}
