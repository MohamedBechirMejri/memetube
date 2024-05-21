import { FaHeart } from "react-icons/fa";

import type { Comment as CommentT } from "~/types/Video";

type Props = {
  comment: CommentT;
};

export default function Comment({ comment }: Props) {
  return (
    <div key={comment.createdAt} className="flex justify-between gap-4 p-4">
      <div className="flex flex-col">
        <span className="font-semibold">{comment.author.name}</span>
        <span>{comment.body}</span>
      </div>

      <button className="flex items-center gap-1">
        <FaHeart />
        <span>{comment.likes.length}</span>
      </button>
    </div>
  );
}
