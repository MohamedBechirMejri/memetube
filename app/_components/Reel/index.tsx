import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useUserStore } from "~/lib/globals/user";
import { Video } from "~/types/Video";
import VideoPlayer from "~/app/_components/Reel/Video";

type Props = {
  video: Video;
};

export default function Reel({ video }: Props) {
  const { url, createdAt, name, id } = video;

  const { user } = useUserStore();

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    if (!user) return;

    const db = getFirestore();

    const updateViews = async () => {
      const latestData = (await getDoc(doc(db, "videos", id))).data();
      const { views } = latestData!;

      if (views.includes("users/" + user?.uid)) return;

      const newViews = [...views, "users/" + user?.uid];
      await setDoc(doc(db, "videos", id), { views: newViews }, { merge: true });
    };

    const updateHistory = async () => {
      let { history } = user;

      if (!history) history = [];
      if (history.includes("videos/" + id)) return;

      const newHistory = [...history, "videos/" + id];

      await setDoc(
        doc(db, "users", user.uid),
        { history: newHistory },
        { merge: true },
      );
    };

    updateViews();
    updateHistory();
  }, [id, user]);

  return (
    <div
      ref={ref}
      className="relative mb-8 flex h-full w-full snap-center items-center"
    >
      <VideoPlayer url={url} isInView={isInView} />

      <p className="absolute bottom-0 left-0 z-30 w-full bg-gradient-to-t from-slate-950 p-4 font-semibold">
        <span className="line-clamp-1 w-[65%]"> {name}</span>
        <span className="text-sm font-normal opacity-80">
          {new Date(createdAt).toDateString()}
        </span>
      </p>
    </div>
  );
}
