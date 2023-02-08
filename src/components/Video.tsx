import { Player } from "video-react";

const Video = ({ src }: { src: string }) => {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden bg-black">
      <Player src={src} preload="auto" />
      {/* <video
        muted
        src={src}
        className="absolute h-full w-full object-fill blur-3xl"
      />
      <video src={src} controls className="relative z-10 h-full elevation-8" /> */}
    </div>
  );
};

export default Video;
