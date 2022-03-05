import React from "react";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import { MdOutlineLibraryAdd, MdOutlineShare } from "react-icons/md";
import VideoData from "../../Types/VideoData";

function ToolBox({ video }: { video: VideoData }): JSX.Element {
  return (
    <div className="flex items-center gap-2">
      {" "}
      <button
        type="button"
        className="flex items-center gap-2 p-1 transition-all rounded hover:bg-slate-700 active:bg-slate-600"
      >
        {/* <AiFillLike /> */}
        <AiOutlineLike />
        {video.likes.length}
      </button>
      <button
        type="button"
        className="flex items-center gap-2 p-1 transition-all rounded hover:bg-slate-700 active:bg-slate-600"
      >
        {/* <AiFillDislike /> */}
        <AiOutlineDislike />
        {video.dislikes.length}
      </button>
      <button
        type="button"
        className="flex items-center gap-2 p-1 transition-all rounded hover:bg-slate-700 active:bg-slate-600"
      >
        <MdOutlineLibraryAdd /> Save
      </button>
      <button
        type="button"
        className="flex items-center gap-2 p-1 transition-all rounded hover:bg-slate-700 active:bg-slate-600"
      >
        <MdOutlineShare /> Share
      </button>
    </div>
  );
}

export default ToolBox;
