import Image from "next/image";
import { FaHeart } from "react-icons/fa";

import type { Comment as CommentT } from "~/types/Video";

type Props = {
  comment: CommentT;
};

export default function Comment({ comment }: Props) {
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

      <button className="flex shrink-0 flex-col items-center gap-1 text-xl">
        <FaHeart />
        <span className="text-xs">{comment.likes.length}</span>
      </button>
    </div>
  );
}
