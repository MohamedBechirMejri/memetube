import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { motion, useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { TbPlayerPauseFilled, TbPlayerPlayFilled } from "react-icons/tb";
import { useUserStore } from "~/lib/globals/user";
import { Video } from "~/types/Video";

type Props = {
  video: Video;
};

export default function Reel({ video }: Props) {
  const { url, createdAt, name, id } = video;

  const { user } = useUserStore();

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState("stopped");

  useEffect(() => {
    if (isInView) setStatus("playing");
    else setStatus("stopped");
  }, [isInView]);

  const togglePlay = useCallback(() => {
    if (status === "playing") setStatus("stopped");
    else setStatus("playing");
  }, [status]);

  useEffect(() => {
    if (status === "stopped") {
      videoRef.current?.pause();
      videoRef2.current?.pause();
    } else if (status === "playing") {
      videoRef.current?.play();
      videoRef2.current?.play();
    }
  }, [status]);

  useEffect(() => {
    const db = getFirestore();

    const updateViews = async () => {
      const latestData = (await getDoc(doc(db, "videos", id))).data();

      const { views } = latestData!;

      const newViews =
        !user || views.includes("users/" + user?.uid)
          ? views
          : [...views, "users/" + user?.uid];

      await setDoc(doc(db, "videos", id), { views: newViews }, { merge: true });
    };

    const updateHistory = async () => {
      if (!user) return;

      let { history } = user!;

      if (!history) history = [];

      const newHistory = history.includes("videos/" + id)
        ? history
        : [...history, "videos/" + id];

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
      onClick={togglePlay}
    >
      <video
        ref={videoRef2}
        src={url}
        className="absolute inset-0 h-full w-full scale-[2] blur-2xl brightness-50"
        muted
      />
      <video
        ref={videoRef}
        src={url}
        className="relative z-10 max-h-full w-full max-w-full"
      />
      <p className="absolute bottom-0 left-0 z-50 w-full bg-gradient-to-t from-slate-950 p-4 font-semibold">
        <span className="line-clamp-1 w-[65%]"> {name}</span>
        <span className="text-sm font-normal opacity-80">
          {new Date(createdAt).toDateString()}
        </span>
      </p>

      {status === "stopped" ? (
        <motion.div>
          <TbPlayerPauseFilled className="absolute bottom-4 right-4 z-50" />
        </motion.div>
      ) : (
        <motion.div>
          <TbPlayerPlayFilled className="absolute bottom-4 right-4 z-50" />
        </motion.div>
      )}
    </div>
  );
}
