import { TbDots } from "react-icons/tb";
import Comment from "./Comments";
import Like from "./Like";
import Save from "./Save";
import Share from "./Share";
import Sound from "./Sound";

export default function ActionBar() {
  return (
    <div className="absolute right-0 z-50 flex h-full flex-col items-center justify-between gap-4 pb-16">
      <Sound />

      <div className="flex flex-col gap-2">
        {/* <button className="p-4 text-3xl">
          <TbDots />
        </button> */}

        <Like />
        <Comment />
        <Save />
        <Share />
      </div>
    </div>
  );
}
