import { useCallback, useEffect, useRef, useState } from "react";
import { useSettingsStore } from "~/lib/globals/settings";

type Props = {
  url: string;
  isInView: boolean;
};

export default function Video({ url, isInView }: Props) {
  const [status, setStatus] = useState<"playing" | "stopped">("stopped");

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
    } else if (status === "playing") {
      videoRef.current?.play();
      videoRef2.current?.play();
    }
  }, [status]);

  useEffect(() => {
    if (isInView) setStatus("playing");
    else setStatus("stopped");
  }, [isInView]);

  return (
    <div onClick={togglePlay} className="flex h-full w-full items-center">
      <video
        ref={videoRef2}
        src={url}
        className="absolute inset-0 h-full w-full scale-[2] blur-2xl brightness-50"
        muted
        loop
        preload="auto"
      />
      <video
        ref={videoRef}
        src={url}
        className="relative z-10 max-h-full w-full max-w-full"
        loop
        muted={settings.muted}
        preload="auto"
      />
    </div>
  );
}
