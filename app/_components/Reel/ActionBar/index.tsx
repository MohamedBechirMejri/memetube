import { IoIosShareAlt } from "react-icons/io";
import { RxBookmarkFilled, RxSpeakerOff } from "react-icons/rx";
import { TbDots } from "react-icons/tb";
import Comment from "./Comments";
import Like from "./Like";

export default function ActionBar() {
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
    <div className="absolute bottom-16 right-0 z-50 flex h-full flex-col justify-between gap-4">
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
