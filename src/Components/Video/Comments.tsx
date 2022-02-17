import React from "react";
import {
  MdDelete,
  MdEdit,
  MdExpandMore,
  MdFlag,
  MdMoreHoriz,
  MdReply,
  MdThumbDown,
  MdThumbUp,
} from "react-icons/md";

function Comments(): JSX.Element {
  return (
    <div>
      <div className="flex items-center gap-4 m-2 text-xl font-bold">
        <h2 className="">500 Comments</h2>
        <label htmlFor="sort-comment">
          Sort by:
          <select id="sort-comment" className="ml-2 bg-transparent">
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="top">Top</option>
          </select>
        </label>
      </div>
      <div className="flex flex-col">
        {comments.map(comment => (
          <div className="flex items-start justify-start w-full gap-2 p-4 px-4 transition-all ">
            <img
              src={comment.user.avatar}
              alt="avatar"
              className="w-8 h-8 mr-2 rounded-full"
            />
            <div className="flex flex-col items-start justify-start gap-2">
              <div className="flex items-center justify-center gap-2">
                <span className="font-bold">{comment.user.name}</span>
                <span className="text-xs text-gray-400">{comment.date}</span>
              </div>
              <p className="">{comment.comment}</p>
              <div className="flex items-center justify-start w-full gap-4 transition-all ">
                <span className="flex items-center justify-center gap-1">
                  <MdThumbUp className="text-gray-400" />
                  <span className="text-xs text-gray-400">0</span>
                </span>
                <span className="flex items-center justify-center gap-1">
                  <MdThumbDown className="text-gray-400" />
                  <span className="text-xs text-gray-400">0</span>
                </span>
                <span className="flex items-center justify-center gap-1">
                  <MdReply className="text-gray-400" />
                  <span className="text-xs text-gray-400">Reply</span>
                </span>

                <MdMoreHoriz className="text-gray-400" />
                {/* <MdFlag />
                Report
                <MdDelete />
                Delete
                <MdEdit />
                Edit */}
              </div>{" "}
              <div className="flex items-center justify-center gap-2 p-1 font-medium text-blue-500 transition-all rounded-md cursor-pointer ">
                {" "}
                <MdExpandMore className="font-medium text-blue-500" />
                View Replies
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comments;
