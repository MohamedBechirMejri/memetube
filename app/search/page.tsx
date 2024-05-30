"use client";

import { useState } from "react";
import { Input } from "~/components/ui/input";
import Categories from "./Categories";
import { useVideoStore } from "~/lib/globals/video";
import { Video } from "~/types/Video";
import L from "next/link";
import { motion } from "framer-motion";

const Link = motion(L);

export default function Search() {
  const { collection } = useVideoStore();

  const [search, setSearch] = useState("");

  const filtered = (collection || []).filter((v) =>
    v.name.toLowerCase().includes(search),
  );

  return (
    <main className="flex h-full flex-col items-center gap-4 p-4 pt-16">
      <Input
        placeholder="Search.."
        onChange={async (e) => setSearch(e.target.value.trim().toLowerCase())}
        className="w-full rounded-2xl border-none bg-slate-500 bg-opacity-10 p-6 text-lg"
      />
      {search.length < 3 ? (
        <Categories />
      ) : (
        <div className="grid w-full grid-cols-2 gap-4 overflow-y-scroll p-2 pt-4">
          <div className="flex flex-col gap-4">
            {filtered.map((v, i) =>
              i % 2 === 1 ? null : <Result key={v.id} video={v} i={i} />,
            )}
          </div>
          <div className="flex flex-col gap-4">
            {filtered.map((v, i) =>
              i % 2 === 0 ? null : <Result key={v.id} video={v} i={i} />,
            )}
          </div>

          {filtered.length === 0 && (
            <p className="col-span-2 pt-8 text-center text-lg font-semibold text-slate-200">
              No results found
            </p>
          )}
        </div>
      )}
    </main>
  );
}

function Result({ video, i }: { video: Video; i: number }) {
  return (
    <Link
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1 }}
      transition={{
        type: "spring",
        damping: 10,
        stiffness: 100,
        duration: 0.3,
        delay: i > 10 ? 0 : i * 0.1,
        scale: { type: "spring", damping: 10, stiffness: 100, delay: 0 },
      }}
      href={"/v/" + video.id}
      key={video.id}
      className="relative flex h-max w-full flex-col justify-between gap-2 overflow-hidden rounded-lg"
    >
      <video
        src={video.url}
        preload="off"
        autoPlay={false}
        className="relative h-max"
      />

      <p className="absolute bottom-0 w-full bg-black bg-opacity-40 p-2 py-3 text-xs backdrop-blur">
        <span className="text-sm font-medium">{video.name}</span>
        <br />
        <span className="opacity-80">
          {video.views.length} views •{" "}
          {new Date(video.createdAt).toDateString()}
        </span>
      </p>
    </Link>
  );
}
