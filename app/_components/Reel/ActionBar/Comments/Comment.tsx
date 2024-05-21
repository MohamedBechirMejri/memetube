import { doc, getFirestore, setDoc } from "firebase/firestore";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { useUserStore } from "~/lib/globals/user";
import { useVideoStore } from "~/lib/globals/video";

import type { Comment as CommentT } from "~/types/Video";

type Props = {
  comment: CommentT;
};

export default function Comment({ comment }: Props) {
  const { video } = useVideoStore();
  const { user } = useUserStore();

  const db = getFirestore();

  const handleLike = async () => {
    if (!user || !video) return;

    let likes;

    if (comment.likes.includes("users/" + user.uid))
      likes = comment.likes.filter((like) => like !== "users/" + user.uid);
    else likes = [...comment.likes, "users/" + user.uid];

    const newComments = video.comments.map((c) =>
      c.id === comment.id ? { ...c, likes } : c,
    );

    await setDoc(
      doc(db, "videos", video.id),
      { comments: newComments },
      { merge: true },
    );
  };

  return (
    <div
      key={comment.createdAt}
      className="flex items-start justify-between gap-4 p-4"
    >
      <div className="flex items-start gap-2">
        <Image
          src={comment.author.image}
          alt={comment.author.name}
          className="size-10 rounded-full object-contain"
          width={40}
          height={40}
        />
        <div className="flex flex-col gap-1">
          <span className="font-semibold opacity-70">
            {comment.author.name}
          </span>
          <p className="text-balance">{comment.body}</p>
        </div>
      </div>

      <button
        className={`mt-2 flex shrink-0 flex-col items-center gap-2 text-xl ${comment.likes.includes("users/" + user?.uid) ? "text-rose-500" : ""}`}
        onClick={handleLike}
      >
        <FaHeart />
        <span className="text-xs">{comment.likes.length}</span>
      </button>
    </div>
  );
}
