/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useInView } from "react-intersection-observer";
import { useCallback, useEffect, useRef } from "react";

const Video = ({ src }: { src: string }) => {
  const ref = useRef();
  const { ref: inViewRef, inView } = useInView();

  const setRefs = useCallback(
    (node: any) => {
      ref.current = node;
      inViewRef(node);
    },
    [inViewRef]
  );

  useEffect(() => {
    // @ts-ignore
    inView ? ref.current.play() : ref.current.pause();
  }, [inView, ref]);

  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden bg-black">
      <video
        muted
        autoPlay
        loop
        playsInline
        src={src}
        className="absolute h-full w-full object-fill blur-3xl"
      />
      <video
        ref={setRefs}
        src={src}
        controls
        className="relative z-10 h-full elevation-8"
      />
    </div>
  );
};

export default Video;
