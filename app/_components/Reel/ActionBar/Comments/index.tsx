import { useState } from "react";
import { FaCommentDots } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";
import { useVideoStore } from "~/lib/globals/video";
import Comment from "./Comment";
import CommentInput from "./Input";

export default function Comments() {
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  const { video } = useVideoStore();

  const comments = video?.comments || [];

  const showComments = () => setIsCommentsVisible(true);
  const hideComments = () => setIsCommentsVisible(false);

  return (
    <>
      <button
        onClick={showComments}
        className="flex flex-col items-center gap-1 p-4"
      >
        {<FaCommentDots className="text-3xl" />}
        <span>{video?.comments.length}</span>
      </button>

      <div className="fixed bottom-[4rem] left-1/2 grid h-[64svh] w-full max-w-[38rem] -translate-x-1/2 grid-rows-[auto,minmax(0,1fr),auto] overflow-hidden rounded-t-2xl bg-slate-950 bg-opacity-30 p-4 backdrop-blur-3xl">
        <div className="flex items-center justify-between">
          <button className="pointer-events-none text-3xl opacity-0">
            <RiCloseFill />
          </button>
          <span>{video?.comments.length} Comments</span>
          <button className="text-3xl" onClick={hideComments}>
            <RiCloseFill />
          </button>
        </div>

        <div className="h-full overflow-y-auto">
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>

        <CommentInput />
      </div>
    </>
  );
}
