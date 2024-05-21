import { IoHeart } from "react-icons/io5";
import { useVideoStore } from "~/lib/globals/video";

export default function Like() {
  const { video } = useVideoStore();

  const handleLike = () => {};

  return (
    <button
      onClick={handleLike}
      className="flex flex-col items-center gap-1 p-4"
    >
      {<IoHeart className="text-3xl" />}
      <span>{video?.likes.length}</span>
    </button>
  );
}
