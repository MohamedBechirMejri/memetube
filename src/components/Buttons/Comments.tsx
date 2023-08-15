/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import { useState } from "react";
import { AiOutlineCloseCircle, AiOutlineSend } from "react-icons/ai";
import Image from "next/image";
import ScrollToBottom from "react-scroll-to-bottom";

const Comments = ({
  id,
  comments,
  setIsCommentsShown,
  user,
}: {
  id: string;
  comments: {
    id: string;
    comment: string;
    user: { displayName: string; photoURL: string; id: string };
    date: string;
  }[];
  setIsCommentsShown: (arg: boolean) => void;
  user: any;
}) => {
  const [comment, setComment] = useState("");
  const [db] = useState(getFirestore());
  const docRef = doc(db, "videos", id);

  const handleComment = () => {
    if (!comment || !user) return;

    const { displayName, photoURL, uid } = user;

    const newComment = {
      id: nanoid(),
      comment,
      user: { displayName, photoURL, id: uid },
      date: new Date().toISOString(),
    };

    const newComments = [...comments, newComment];

    updateDoc(docRef, {
      comments: newComments,
    })
      .then(() => {
        setComment("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="fixed top-0 left-1/2 z-[70] h-[100svh] w-[100svw] max-w-3xl -translate-x-1/2">
      <motion.div
        initial={{ scaleY: 0, x: "0", opacity: 1 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="grid h-full w-full origin-bottom grid-rows-[auto,1fr,auto] gap-4 rounded-2xl bg-white p-4 px-0 elevation-2"
      >
        <div className="flex items-center justify-between px-4 text-gray-500">
          <h1 className="text-xl font-semibold">Comments</h1>
          <button
            className="text-3xl transition-all hover:text-red-600"
            onClick={() => setIsCommentsShown(false)}
          >
            <AiOutlineCloseCircle />
          </button>
        </div>
        <ScrollToBottom className="overflow-x-hidden overflow-y-scroll p-4 scrollbar-none">
          <div className="flex flex-col items-stretch justify-end gap-4">
            {comments.map((comment) => (
              <motion.div
                initial={{
                  opacity: 0,
                  x: user && comment.user.id === user.uid ? "-50%" : "50%",
                }}
                animate={{ opacity: 1, x: "0" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                key={comment.id}
                className={`flex gap-2 ${
                  user && comment.user.id === user.uid
                    ? "flex-row-reverse items-center"
                    : "flex-row items-start"
                }`}
              >
                <Image
                  src={comment.user.photoURL}
                  alt="user"
                  width={48}
                  height={48}
                  className="h-6 w-6 rounded-full"
                />
                <div className="flex flex-col">
                  {!user ||
                    (comment.user.id !== user.uid && (
                      <h1 className="text-xs font-medium">
                        {comment.user.displayName}
                      </h1>
                    ))}
                  <p
                    className={`rounded-2xl p-2 px-4 font-semibold ${
                      user && comment.user.id === user.uid
                        ? "bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 text-white"
                        : "bg-gray-300"
                    }`}
                  >
                    {comment.comment}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollToBottom>
        <div className="grid w-full grid-cols-[1fr,auto] place-items-center gap-4 px-4">
          <input
            type="text"
            placeholder="Add Comment..."
            className="h-12 w-full rounded-2xl border-none bg-slate-200 ring-transparent transition-all focus:ring-2 focus:ring-slate-500 "
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            // submit on enter
            onKeyDown={(e) => {
              if (e.key === "Enter") handleComment();
            }}
          />

          <button
            className="text-3xl transition-all active:scale-95"
            onClick={handleComment}
          >
            <AiOutlineSend />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Comments;
