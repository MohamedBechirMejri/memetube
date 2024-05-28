"use client";

import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Category as TCategory } from "~/types/Video";

import Reel from "~/components/Reel";
import ActionBar from "~/components/Reel/ActionBar";
import { useUserStore } from "~/lib/globals/user";
import { useVideoStore } from "~/lib/globals/video";
import Link from "next/link";

export default function Category({ params }: { params: { id: string } }) {
  const { id } = params;

  const [category, setCategory] = useState<TCategory | null>(null);

  const { video, collection } = useVideoStore();
  const { user } = useUserStore();

  const db = getFirestore();

  useEffect(() => {
    const getCategory = async () => {
      const cat = await getDoc(doc(db, "categories", id));
      setCategory(cat.data() as TCategory);
    };

    getCategory();
  }, [db, id]);

  const sortedVideos = (collection || [])
    .filter((v) => v.categories.includes(id))
    .sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="h-full w-full snap-y snap-mandatory overflow-hidden overflow-y-scroll">
      <h1 className="ghosting-text fixed left-0 top-4 z-50 w-full text-center text-2xl font-bold">
        {category?.name}
      </h1>

      {video && sortedVideos.length ? <ActionBar /> : null}

      {video && sortedVideos.length ? (
        <p className="absolute bottom-0 left-0 z-30 w-full bg-gradient-to-t from-slate-950 p-4 pb-16 font-semibold">
          <span className="line-clamp-1 w-[65%]">{video.name}</span>
          <span className="items-center text-sm font-normal opacity-80">
            {new Date(video.createdAt).toDateString()} <br />
            {video.views.length} views
          </span>
        </p>
      ) : null}

      {sortedVideos.map((video, i) => (
        <Reel key={video.id} video={video} i={i} />
      ))}

      {sortedVideos.length === 0 ? (
        <div className="center absolute p-4 text-center font-bold text-white">
          No videos found in this category
          <br />
          <Link href="/search" className="mt-4 block text-rose-500">Go back</Link>
        </div>
      ) : null}
    </div>
  );
}
