"use client";

import { useEffect, useRef } from "react";

import Reel from "~/components/Reel";
import ActionBar from "~/components/Reel/ActionBar";
import { useUserStore } from "~/lib/globals/user";
import { useVideoStore } from "~/lib/globals/video";

export default function Home() {
  const { video, collection } = useVideoStore();
  const { user } = useUserStore();

  // since the videos list updates in real-time, we don't want the videos to disappear after the user watches them so we'll keep a constant history that's loaded when the component mounts
  const historyRef = useRef<string[] | null>(null);

  useEffect(() => {
    if (!historyRef.current) historyRef.current = user?.history || null;
  }, [user]);

  const sortedVideos = (collection || [])
    // .filter((v) => {
    //   // return true; // uncomment this line to see all videos
    //   if (!historyRef.current) return true;
    //   return !historyRef.current.includes(v.id);
    // })
    .sort((a, b) => {
      return b.createdAt - a.createdAt;
    })
    // move watched videos to the end of the list
    .sort((a, b) => {
      if (!historyRef.current) return 0;
      return historyRef.current.includes(a.id) ? 1 : -1;
    });

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

      {sortedVideos.map((video, i) => (
        <Reel key={video.id} video={video} i={i} />
      ))}
    </main>
  );
}
