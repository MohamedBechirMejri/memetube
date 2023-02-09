/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useInView } from "react-intersection-observer";
import { useCallback, useEffect, useRef, useState } from "react";

const Video = ({ src }: { src: string }) => {
  const ref = useRef();
  const bgRef = useRef();
  const { ref: inViewRef, inView } = useInView();
  const [isPlaying, setIsPlaying] = useState(false);

  const setRefs = useCallback(
    (node: any) => {
      ref.current = node;
      inViewRef(node);
    },
    [inViewRef]
  );

  useEffect(() => {
    // @ts-ignore
    isPlaying ? bgRef.current.play() : bgRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    // @ts-ignore
    inView ? ref.current.play() : ref.current.pause();
  }, [inView, ref]);

  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden rounded-3xl bg-black elevation-12">
      <video
        ref={bgRef}
        muted
        loop
        src={src}
        className="absolute h-full w-full object-fill blur-3xl"
      />
      <video
        ref={setRefs}
        src={src}
        controls
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="relative z-10 h-full elevation-8"
      />
    </div>
  );
};

export default Video;
