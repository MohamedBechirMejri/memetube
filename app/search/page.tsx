"use client";

import { useState } from "react";
import { Input } from "~/components/ui/input";
import Categories from "./Categories";
import { useVideoStore } from "~/lib/globals/video";
import { Video } from "~/types/Video";
import Link from "next/link";

export default function Search() {
  const { collection } = useVideoStore();

  const [search, setSearch] = useState("");

  const filtered = (collection || []).filter((v) => v.name.includes(search));

  return (
    <main className="flex h-full flex-col items-center gap-8 p-4 pt-16">
      <Input
        placeholder="Search.."
        onChange={async (e) => setSearch(e.target.value.trim())}
        className="w-full rounded-2xl border-none bg-slate-500 bg-opacity-10 p-6 text-lg"
      />
      {search.length < 3 ? (
        <Categories />
      ) : (
        <div className="grid w-full grid-cols-2 gap-4 overflow-y-scroll p-2">
          <div className="flex flex-col gap-4">
            {filtered.map((v, i) =>
              i % 2 === 1 ? null : <Result key={v.id} video={v} />,
            )}
          </div>
          <div className="flex flex-col gap-4">
            {filtered.map((v, i) =>
              i % 2 === 0 ? null : <Result key={v.id} video={v} />,
            )}
          </div>
        </div>
      )}
    </main>
  );
}

function Result({ video }: { video: Video }) {
  return (
    <Link
      href={"/v/" + video.id}
      key={video.id}
      className="relative flex h-max w-full flex-col justify-between gap-2 overflow-hidden rounded-lg ring-blue-500 ring-opacity-50 transition-all duration-300 hover:ring"
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
