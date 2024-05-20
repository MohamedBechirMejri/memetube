import { FaCommentDots } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import { RxBookmarkFilled } from "react-icons/rx";
import { TbDots } from "react-icons/tb";
import { Video } from "~/types/Video";

type Props = {
  video: Video;
};

export default function ActionBar({ video }: Props) {
  return (
    <div className="absolute bottom-0 right-0 z-30 flex flex-col gap-4 pb-4">
      <button className="p-4 text-3xl">
        <TbDots />
      </button>
      <button className="p-4">
        <IoHeart className="text-3xl" />
        {video.likes.length}
      </button>
      <button className="p-4">
        <FaCommentDots className="text-3xl" />
        {video.comments.length}
      </button>
      <button className="p-4">
        <RxBookmarkFilled className="text-3xl" />
      </button>
      <button className="p-4">
        <IoIosShareAlt className="text-3xl" />
      </button>
    </div>
  );
}
