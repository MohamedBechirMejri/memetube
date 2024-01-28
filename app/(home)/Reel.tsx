import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Props = {
  video: string;
};

export default function Reel({ video }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const videoRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      key={video}
      className="relative flex h-[calc(100svh-5rem)] items-center"
    >
      <video src={video} className="max-h-full max-w-full" />
      <p className="absolute bottom-0 left-4">video name.mp4</p>
    </div>
  );
}
