/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { doc, updateDoc } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  AiOutlineComment,
  AiOutlineHeart,
  AiOutlineShareAlt,
  AiTwotoneHeart,
} from "react-icons/ai";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useCopyToClipboard } from "usehooks-ts";
import UserContext from "../../../lib/UserContext";
import Comments from "./Comments";

const Buttons = ({
  id,
  likes,
  comments,
  db,
}: {
  id: string;
  likes: string[];
  comments: {
    id: string;
    comment: string;
    user: { displayName: string; photoURL: string; id: string };
    date: string;
  }[];
  db: any;
}) => {
  const [user] = useContext(UserContext);

  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isCommentsShown, setIsCommentsShown] = useState(false);
  const copy = useCopyToClipboard()[1];

  const videoRef = doc(db, "videos", id);

  const handleLike = async () => {
    if (!user) return;

    if (isLiked) {
      await updateDoc(videoRef, {
        // @ts-ignore
        likes: likes.filter((like) => like !== user.uid),
      });
    } else {
      await updateDoc(videoRef, {
        // @ts-ignore
        likes: [...likes, user.uid],
      });
    }
  };

  const handleSave = async () => {
    if (!user) return;

    // @ts-ignore
    const userRef = doc(db, "users", user.uid);

    // @ts-ignore
    if (user.saved === undefined) {
      await updateDoc(userRef, { saved: [] });
    }

    if (isSaved) {
      await updateDoc(userRef, {
        // @ts-ignore
        saved: user.saved.filter((video) => video !== id),
      });
      toast.success("Unsaved!");
    } else {
      await updateDoc(userRef, {
        // @ts-ignore
        saved: [...(user.saved ?? []), id],
      });
      toast.success("Saved!");
    }
  };

  useEffect(() => {
    if (!user) return;
    // @ts-ignore
    if (likes.includes(user.uid)) setIsLiked(true);
    else setIsLiked(false);
  }, [likes, user]);

  useEffect(() => {
    if (!user) return;
    // @ts-ignore
    if (user.saved && user.saved.includes(id)) setIsSaved(true);
    else setIsSaved(false);
  }, [id, user]);

  return (
    <div className="grid grid-cols-4 gap-4 pt-4">
      <motion.button
        initial={{ scale: 0.75, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", damping: 10, stiffness: 100 }}
        className="relative grid place-items-center text-4xl"
        onClick={() => {
          void handleLike();
        }}
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
        onClick={() => setIsCommentsShown(true)}
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
          void copy("https://beautube.vercel.app/v/" + id);
          toast.success("Link Copied!");
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
        onClick={() => {
          void handleSave();
        }}
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

      <AnimatePresence>
        {isCommentsShown && (
          <Comments
            id={id}
            comments={comments}
            user={user}
            setIsCommentsShown={setIsCommentsShown}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Buttons;
