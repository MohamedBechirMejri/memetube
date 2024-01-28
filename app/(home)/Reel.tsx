import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  video: {
    key: string;
    likes: number;
    name: string;
    serverData: {
      uploadedBy: string;
    };
    size: number;
    title: string;
    url: string;
  };
};

export default function Reel({ video }: Props) {
  const { name, title, url } = video;

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isInView) videoRef.current?.play();
    else videoRef.current?.pause();
  }, [isInView]);

  return (
    <div
      ref={ref}
      className="relative mb-8 flex h-[calc(100svh-5rem)] w-full snap-center items-center"
    >
      <video ref={videoRef} src={url} className="max-h-full max-w-full" />
      <p className="absolute bottom-0 left-4">{title || name}</p>
    </div>
  );
}
