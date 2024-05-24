"use client";

import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Reel from "~/app/_components/Reel";
import ActionBar from "~/app/_components/Reel/ActionBar";
import { firebaseConfig } from "~/lib/firebase";
import { useUserStore } from "~/lib/globals/user";
import { useVideoStore } from "~/lib/globals/video";

export default function Favorites() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const { video } = useVideoStore();
  const { user } = useUserStore();

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "videos"),
      (snapshot) => {
        const videos = snapshot.docs.map((doc) => doc.data());
        setVideos(videos);
        setLoading(false);
      },
      (error) => console.error(error),
    );

    return () => unsubscribe();
  }, [db]);

  useEffect(() => {
    if (!user) return router.push("/login");
  }, [user, router]);

  // not memoized to test new react compiler
  const sortedVideos = videos
    .filter((v) => {
      if (!user) return true;
      return user.favorites.includes(v.id);
    })
    .sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

  const isEmpty = !video || !sortedVideos.length;

  return (
    <main className="h-full w-full snap-y snap-mandatory overflow-hidden overflow-y-scroll">
      {loading ? (
        <p className="center absolute">Loading..</p>
      ) : (
        <>
          {isEmpty ? (
            <p className="center absolute w-max text-center font-semibold">
              You haven{"'"}t saved any videos yet.
              <br />
              <Link href={"/"} className="block pt-4 text-blue-500">
                Browse videos
              </Link>
            </p>
          ) : (
            <ActionBar />
          )}

          {!isEmpty ? (
            <p className="absolute bottom-16 left-0 z-30 w-full bg-gradient-to-t from-slate-950 p-4 font-semibold">
              <span className="line-clamp-1 w-[65%]">{video.name}</span>
              <span className="items-center text-sm font-normal opacity-80">
                {new Date(video.createdAt).toDateString()} <br />
                {video.views.length} views
              </span>
            </p>
          ) : null}

          {sortedVideos.map((video) => (
            <Reel key={video.id} video={video} />
          ))}
        </>
      )}
    </main>
  );
}
