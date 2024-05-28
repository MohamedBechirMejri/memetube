"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import Reel from "~/components/Reel";
import ActionBar from "~/components/Reel/ActionBar";
import { useUserStore } from "~/lib/globals/user";
import { useVideoStore } from "~/lib/globals/video";

export default function Home({ params }: { params: { id: string } }) {
  const { id } = params;

  const { video, collection, rawCollection } = useVideoStore();
  const { user } = useUserStore();

  const historyRef = useRef<string[] | null>(null);

  useEffect(() => {
    if (!historyRef.current) historyRef.current = user?.history || null;
  }, [user]);

  const sortedVideos = (collection || [])
    .sort((a, b) => {
      return b.createdAt - a.createdAt;
    })
    // move watched videos to the end of the list
    .sort((a) => {
      if (!historyRef.current) return 0;
      return historyRef.current.includes(a.id) ? 1 : -1;
    })
    .filter((v) => v.id !== id);

  // using rawCollection here since the video might be filtered in the collection due to nsfw/language
  const v = rawCollection?.find((v) => v.id === id);

  return (
    <main className="h-full w-full snap-y snap-mandatory overflow-hidden overflow-y-scroll">
      {v && <ActionBar />}

      {video && v && (
        <p className="absolute bottom-16 left-0 z-30 w-full bg-gradient-to-t from-slate-950 p-4 font-semibold">
          <span className="line-clamp-1 w-[65%]">{video.name}</span>
          <span className="items-center text-sm font-normal opacity-80">
            {new Date(video.createdAt).toDateString()} <br />
            {video.views.length} views
          </span>
        </p>
      )}

      {v && <Reel key={v.id} video={v} i={0} />}

      {v &&
        sortedVideos.map((video, i) => (
          <Reel key={video.id} video={video} i={i + 1} />
        ))}

      {!v && (
        <div className="center absolute flex select-none flex-col gap-4 p-4 text-center font-bold text-white">
          <span className="ghosting-text text-5xl italic">404</span>
          <p className="ghosting-text text-2xl">Meme not found</p>
          <Link
            href="/"
            className="mt-4 block rounded-xl bg-slate-500 bg-opacity-20 p-2 font-normal text-slate-300 hover:bg-opacity-15"
          >
            Browse other memes
          </Link>
        </div>
      )}
    </main>
  );
}
