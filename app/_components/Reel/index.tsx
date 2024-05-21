import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import VideoPlayer from "~/app/_components/Reel/Video";
import { useUserStore } from "~/lib/globals/user";
import { Video } from "~/types/Video";
import ActionBar from "./ActionBar";
import { useVideoStore } from "~/lib/globals/video";

type Props = {
  video: Video;
};

export default function Reel({ video }: Props) {
  const { url, createdAt, name, id, views } = video;

  const { user } = useUserStore();
  const { setVideo } = useVideoStore();

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    const db = getFirestore();

    const updateViews = async () => {
      const latestData = (await getDoc(doc(db, "videos", id))).data();
      const { views } = latestData!;

      if (views.includes("users/" + user?.uid)) return;

      let newViews;

      if (!user) {
        const { ip } = await (
          await fetch("https://api.ipify.org?format=json")
        ).json();

        newViews = views.includes("ips/" + ip)
          ? [...views]
          : [...views, "ips/" + ip];
      } else newViews = [...views, "users/" + user?.uid];

      await setDoc(doc(db, "videos", id), { views: newViews }, { merge: true });
    };

    const updateHistory = async () => {
      if (!user) return;

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

  useEffect(() => {
    if (isInView) setVideo(video);
  }, [isInView, setVideo, video]);

  return (
    <div
      ref={ref}
      className="relative mb-8 flex h-full w-screen snap-center items-center"
    >
      <VideoPlayer url={url} isInView={isInView} />

      <p className="absolute bottom-0 left-0 z-30 w-full bg-gradient-to-t from-slate-950 p-4 font-semibold">
        <span className="line-clamp-1 w-[65%]">{name}</span>
        <span className="items-center text-sm font-normal opacity-80">
          {new Date(createdAt).toDateString()} <br /> {views.length} views
        </span>
      </p>

      <ActionBar video={video} />
    </div>
  );
}
