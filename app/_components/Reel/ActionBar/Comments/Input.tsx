import { TComment } from "~/types/Video";

import { doc, getFirestore, setDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useUserStore } from "~/lib/globals/user";
import { useVideoStore } from "~/lib/globals/video";

export default function CommentInput() {
  const [input, setInput] = useState("");

  const { video } = useVideoStore();
  const { user } = useUserStore();

  const db = getFirestore();

  const addComment = async () => {
    if (!user || !video) return;

    const { uid, name, image } = user;

    const comment: TComment = {
      id: nanoid(),
      author: { id: uid, name, image },
      body: input,
      likes: [],
      replies: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await setDoc(
      doc(db, "videos", video.id),
      { comments: [...video.comments, comment] },
      { merge: true },
    );
  };

  return (
    <textarea
      className="h-20 w-full resize-none justify-self-end rounded-xl border border-slate-700 bg-transparent p-4 shadow-xl"
      placeholder="Add Comment"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();

          if (input.trim()) {
            addComment();
            setInput("");
          }
        }
      }}
    />
  );
}
