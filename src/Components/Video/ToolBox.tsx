/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import React from "react";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import {
  // MdOutlineLibraryAdd,
  MdOutlineShare,
} from "react-icons/md";
import toast from "react-hot-toast";
import VideoData from "../../Types/VideoData";

function ToolBox({
  video,
  getVideoData,
}: {
  video: VideoData;
  getVideoData: () => void;
}): JSX.Element {
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getFirestore();

  const { likes, dislikes } = video;

  const handleLike = (): void => {
    if (user === null || video.likes === []) {
      return;
    }
    if (likes.includes(user.uid)) {
      setDoc(
        doc(db, "videos", video.id),
        {
          likes: likes.filter(uid => uid !== user.uid),
        },
        { merge: true }
      );
    } else {
      setDoc(
        doc(db, "videos", video.id),
        {
          likes: [...likes, user.uid],
          dislikes: dislikes.filter(uid => uid !== user.uid),
        },
        { merge: true }
      );
    }
  };

  const handleDislike = (): void => {
    if (user === null || video.likes === []) {
      return;
    }
    if (dislikes.includes(user.uid)) {
      setDoc(
        doc(db, "videos", video.id),
        {
          dislikes: dislikes.filter(uid => uid !== user.uid),
        },
        { merge: true }
      );
    } else {
      setDoc(
        doc(db, "videos", video.id),
        {
          dislikes: [...dislikes, user.uid],
          likes: likes.filter(uid => uid !== user.uid),
        },
        { merge: true }
      );
    }
  };

  const handleShare = (): void => {
    const notify = (): string => toast("Copied to clipboard");
    // copy link to clipboard
    navigator.clipboard.writeText(window.location.href);
    notify();
  };

  return (
    <div className="flex items-center gap-2">
      {" "}
      <button
        type="button"
        className="flex items-center gap-2 p-1 transition-all rounded hover:bg-slate-700 active:bg-slate-600"
        onClick={() => {
          handleLike();
          getVideoData();
        }}
      >
        {likes.includes(user!.uid) ? <AiFillLike /> : <AiOutlineLike />}
        {likes.length}
      </button>
      <button
        type="button"
        className="flex items-center gap-2 p-1 transition-all rounded hover:bg-slate-700 active:bg-slate-600"
        onClick={() => {
          handleDislike();
          getVideoData();
        }}
      >
        {dislikes.includes(user!.uid) ? (
          <AiFillDislike />
        ) : (
          <AiOutlineDislike />
        )}
        {dislikes.length}
      </button>
      {/* <button
        type="button"
        className="flex items-center gap-2 p-1 transition-all rounded hover:bg-slate-700 active:bg-slate-600"
      >
        <MdOutlineLibraryAdd /> Save
      </button> */}
      <button
        type="button"
        className="flex items-center gap-2 p-1 transition-all rounded hover:bg-slate-700 active:bg-slate-600"
        onClick={() => {
          handleShare();
        }}
      >
        <MdOutlineShare /> Share
      </button>
    </div>
  );
}

export default ToolBox;
