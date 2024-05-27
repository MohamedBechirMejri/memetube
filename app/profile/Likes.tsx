"use client";

import Reel from "~/components/Reel";
import ActionBar from "~/components/Reel/ActionBar";
import { useUserStore } from "~/lib/globals/user";
import { useVideoStore } from "~/lib/globals/video";
import Nav from "../Nav";

export default function Likes() {
  const { video, collection } = useVideoStore();
  const { user } = useUserStore();

  const sortedVideos = (collection || [])
    .filter((v) => user?.likes.includes(v.id))
    .sort((a, b) => b.createdAt - a.createdAt);

  return (
    <main className="h-full w-full snap-y snap-mandatory overflow-hidden overflow-y-scroll">
      <ActionBar />

      {video && (
        <p className="absolute bottom-0 left-0 z-30 w-full bg-gradient-to-t from-slate-950 p-4 pb-16 font-semibold">
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
