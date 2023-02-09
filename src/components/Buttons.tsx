import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  AiOutlineComment,
  AiOutlineHeart,
  AiOutlineShareAlt,
  AiTwotoneHeart,
} from "react-icons/ai";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useCopyToClipboard } from "usehooks-ts";

const Buttons = ({
  id,
  likes,
  comments,
}: {
  id: string;
  likes: string[];
  comments: object[];
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const copy = useCopyToClipboard()[1];

  return (
    <div className="grid grid-cols-4 gap-4 pt-4">
      <motion.button
        initial={{ scale: 0.75, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", damping: 10, stiffness: 100 }}
        className="relative grid place-items-center text-4xl"
        onClick={() => setIsLiked(!isLiked)}
      >
        <AnimatePresence>
          {isLiked ? (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <AiTwotoneHeart className="text-red-500" />
            </motion.span>
          ) : (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <AiOutlineHeart />
            </motion.span>
          )}
        </AnimatePresence>

        {likes.length > 0 && (
          <span className="absolute top-full text-sm">{likes.length}</span>
        )}
      </motion.button>

      <motion.button
        initial={{ scale: 0.75, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", damping: 10, stiffness: 100 }}
        className="relative grid place-items-center text-4xl"
        onClick={() => setIsLiked(!isLiked)}
      >
        <AiOutlineComment />
        {comments.length > 0 && (
          <span className="absolute top-full text-sm">{comments.length}</span>
        )}
      </motion.button>

      <motion.button
        initial={{ scale: 0.75, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", damping: 10, stiffness: 100 }}
        className="grid place-items-center text-4xl"
        onClick={() => {
          void copy("https://beautube.vercel.app/v/" + id); // add toast
        }}
      >
        <AiOutlineShareAlt />
      </motion.button>

      <motion.button
        initial={{ scale: 0.75, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", damping: 10, stiffness: 100 }}
        className="grid place-items-center text-3xl"
        onClick={() => setIsSaved(!isSaved)}
      >
        <AnimatePresence>
          {isSaved ? (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <FaBookmark className="text-zinc-500" />
            </motion.span>
          ) : (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <FaRegBookmark />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default Buttons;
