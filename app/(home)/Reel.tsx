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
  const videoRef2 = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isInView) {
      videoRef.current?.play();
      videoRef2.current?.play();
    } else {
      videoRef.current?.pause();
      videoRef2.current?.pause();
    }
  }, [isInView]);

  return (
    <div
      ref={ref}
      className="relative mb-8 flex h-[calc(100svh-5rem)] w-full snap-center items-center"
    >
      <video
        ref={videoRef2}
        src={url}
        className="absolute inset-0 w-full h-full scale-[2] blur-2xl brightness-50"
        muted
      />
      <video
        ref={videoRef}
        src={url}
        className="relative z-10 max-h-full w-full max-w-full"
      />
      {/* <p className="absolute bottom-0 left-4">{title || name}</p> */}
    </div>
  );
}
