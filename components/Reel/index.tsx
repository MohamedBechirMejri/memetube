import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import VideoPlayer from "~/components/Reel/Video";
import { useUserStore } from "~/lib/globals/user";
import { useVideoStore } from "~/lib/globals/video";
import { Video } from "~/types/Video";

type Props = {
  video: Video;
  i: number;
};

export default function Reel({ video, i = 0 }: Props) {
  const { url, id } = video;

  const { user } = useUserStore();
  const { setVideo, setIndex, index } = useVideoStore();

  const db = getFirestore();

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
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
      if (history.includes(id)) return;

      const newHistory = [...history, id];

      await setDoc(
        doc(db, "users", user.uid),
        { history: newHistory },
        { merge: true },
      );
    };

    const timeout = setTimeout(() => {
      updateViews();
      updateHistory();
    }, 4000);

    return () => clearTimeout(timeout);
  }, [db, id, user]);

  useEffect(() => {
    if (isInView) {
      setVideo(video);
      setIndex(i || 0);
    }
  }, [i, isInView, setIndex, setVideo, video]);

  const canRender = index - i <= 2 && index - i >= -2;

  return (
    <div
      ref={ref}
      className="relative mb-8 flex h-full w-screen max-w-[38rem] snap-center items-center"
    >
      {canRender && <VideoPlayer url={url} isInView={isInView} />}
    </div>
  );
}
