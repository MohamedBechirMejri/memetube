import { useRef, useState } from "react";
import { FaCommentDots } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";
import { useVideoStore } from "~/lib/globals/video";
import Comment from "./Comment";
import CommentInput from "./Input";
import { AnimatePresence, motion } from "framer-motion";

export default function Comments() {
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  const { video } = useVideoStore();

  const comments = video?.comments || [];

  const showComments = () => setIsCommentsVisible(true);
  const hideComments = () => setIsCommentsVisible(false);

  const commentsListRef = useRef<HTMLDivElement>(null);

  const cb = () => {
    const list = commentsListRef.current;

    if (!list) return;
    // scroll to bottom of comments list
    // eslint-disable-next-line react-compiler/react-compiler -- will be fixed after merging this https://github.com/facebook/react/pull/29591
    list.scrollTop = list.scrollHeight;
  };

  return (
    <>
      <button
        onClick={showComments}
        className="flex flex-col items-center gap-1 p-4"
      >
        {<FaCommentDots className="text-3xl" />}
        <span>{video?.comments.length}</span>
      </button>

      <AnimatePresence>
        {isCommentsVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed left-1/2 top-0 h-[calc(100svh-4rem)] w-svw max-w-[38rem] -translate-x-1/2 bg-black"
            onClick={hideComments}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCommentsVisible && (
          <motion.div
            initial={{ y: "90%", x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            exit={{ y: "100%", x: "-50%", opacity: 0 }}
            transition={{ type: "spring", damping: 18, stiffness: 150 }}
            className="fixed bottom-[4rem] left-1/2 z-50 grid h-[64svh] w-full max-w-[38rem] -translate-x-1/2 grid-rows-[auto,minmax(0,1fr),auto] overflow-hidden rounded-t-2xl bg-slate-950 bg-opacity-90 p-4 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <button className="pointer-events-none text-3xl opacity-0">
                <RiCloseFill />
              </button>
              <span>{video?.comments.length} Comments</span>
              <button className="text-3xl" onClick={hideComments}>
                <RiCloseFill />
              </button>
            </div>

            <div
              className="h-full overflow-y-auto scroll-smooth"
              ref={commentsListRef}
            >
              {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </div>

            <CommentInput cb={cb} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
