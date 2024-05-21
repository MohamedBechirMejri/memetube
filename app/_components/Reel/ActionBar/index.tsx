import { FaCommentDots } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import { RxBookmarkFilled, RxSpeakerOff } from "react-icons/rx";
import { TbDots } from "react-icons/tb";
import { Video } from "~/types/Video";
import Like from "./Like";
import Comment from "./Comment";

type Props = {
  video: Video;
};

export default function ActionBar({ video }: Props) {
  const buttons = [ 
    {
      icon: RxBookmarkFilled,
      text: "",
      action: () => {},
      color: false,
    },
    {
      icon: IoIosShareAlt,
      action: () => {},
    },
  ];

  return (
    <div className="absolute bottom-0 right-0 z-30 flex h-full flex-col justify-between gap-4">
      <button className="p-4 text-3xl">
        <RxSpeakerOff />
      </button>

      <div className="flex flex-col gap-2">
        <button className="p-4 text-3xl">
          <TbDots />
        </button>

        <Like />
        <Comment />
        {buttons.map((button, i) => (
          <button
            key={i}
            onClick={button.action}
            className="flex flex-col items-center gap-1 p-4"
          >
            {<button.icon className="text-3xl" />}
            <span>{button.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
