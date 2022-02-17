import React from "react";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import { MdOutlineLibraryAdd, MdOutlineShare } from "react-icons/md";

function ToolBox(): JSX.Element {
  return (
    <div className="flex items-center gap-2">
      {" "}
      <button
        type="button"
        className="flex items-center gap-2 p-1 transition-all rounded hover:bg-slate-700 active:bg-slate-600"
      >
        {/* <AiFillLike /> */}
        <AiOutlineLike />0
      </button>
      <button
        type="button"
        className="flex items-center gap-2 p-1 transition-all rounded hover:bg-slate-700 active:bg-slate-600"
      >
        {/* <AiFillDislike /> */}
        <AiOutlineDislike />0
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
