import { motion, useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { TbPlayerPauseFilled, TbPlayerPlayFilled } from "react-icons/tb";
import { Video } from "~/types/Video";

type Props = {
  video: Video;
};

export default function Reel({ video }: Props) {
  const { url, createdAt, name, views } = video;

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

  return (
    <div
      ref={ref}
      className="relative mb-8 flex h-[calc(100svh-5rem)] w-full snap-center items-center"
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
      <p className="absolute bottom-4 left-4 z-50 font-semibold">
        {name}
        <br />
        <span className="text-sm font-normal opacity-70">
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
