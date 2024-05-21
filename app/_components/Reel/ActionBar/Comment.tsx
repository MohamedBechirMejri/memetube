import { RiCloseFill } from "react-icons/ri";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useState } from "react";
import { FaCommentDots, FaHeart } from "react-icons/fa";
import { useUserStore } from "~/lib/globals/user";
import { useVideoStore } from "~/lib/globals/video";
import { nanoid } from "nanoid";
import { Comment as TComment } from "~/types/Video";

export default function Comments() {
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const [input, setInput] = useState("");

  const { video } = useVideoStore();
  const { user } = useUserStore();

  const comments = video?.comments || [];

  const db = getFirestore();

  const showComments = () => setIsCommentsVisible(true);
  const hideComments = () => setIsCommentsVisible(false);

  // const handleLike = async () => {
  //   if (!user || !video) return;

  //   let likes;

  //   if (video.likes.includes("users/" + user.uid)) {
  //     likes = video.likes.filter((like) => like !== "users/" + user.uid);
  //   } else {
  //     likes = [...video.likes, "users/" + user.uid];
  //   }

  //   await setDoc(doc(db, "videos", video.id), { likes }, { merge: true });
  // };

  console.log(comments);

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

        <div className="border">
          {comments.map((comment) => (
            <div
              key={comment.createdAt}
              className="flex justify-between gap-4 p-4"
            >
              <div className="flex flex-col">
                <span className="font-semibold">{comment.author.name}</span>
                <span>{comment.body}</span>
              </div>

              <button className="flex items-center gap-1">
                <FaHeart />
                <span>{comment.likes.length}</span>
              </button>
            </div>
          ))}
        </div>

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
      </div>
    </>
  );
}
