import { TiMediaPause } from "react-icons/ti";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSettingsStore } from "~/lib/globals/settings";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  url: string;
  isInView: boolean;
};

export default function Video({ url, isInView }: Props) {
  const [status, setStatus] = useState<"playing" | "stopped">("stopped");
  const [canPlay, setCanPlay] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  const { settings } = useSettingsStore();

  const togglePlay = useCallback(() => {
    if (status === "playing") setStatus("stopped");
    else setStatus("playing");
  }, [status]);

  useEffect(() => {
    if (status === "stopped") {
      videoRef.current?.pause();
      videoRef2.current?.pause();
    } else if (status === "playing" && canPlay) {
      videoRef.current?.play();
      videoRef2.current?.play();
    }
  }, [status, canPlay]);

  useEffect(() => {
    if (isInView) setStatus("playing");
    else setStatus("stopped");
  }, [isInView]);

  return (
    <div
      onClick={togglePlay}
      className="relative flex h-full w-full items-center"
    >
      <AnimatePresence>
        {status === "stopped" && isInView ? (
          <motion.div
            key={url}
            initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
            className="absolute left-1/2 top-1/2 z-50 flex size-20 items-center justify-center rounded-full bg-black bg-opacity-50 backdrop-blur-3xl"
          >
            <TiMediaPause size={48} />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {!canPlay && (
        <p className="center ghosting-text absolute animate-pulse text-3xl italic">
          loading meme
        </p>
      )}

      <video
        key={url + "main"}
        ref={videoRef}
        src={url}
        className="relative z-20 max-h-full w-full max-w-full"
        loop
        muted={settings.muted}
        preload="auto"
        onCanPlay={() => setCanPlay(true)}
        onLoadedData={() => setCanPlay(true)}
      />

      <video
        key={url + "blur"}
        ref={videoRef2}
        src={url}
        className="absolute inset-0 z-10 h-full w-full scale-[2] blur-2xl brightness-50"
        muted
        loop
        preload="auto"
      />
    </div>
  );
}
