"use client";

import { doc, getFirestore, setDoc } from "firebase/firestore";
import { IoIosShareAlt } from "react-icons/io";
import { RWebShare } from "react-web-share";
import { useUserStore } from "~/lib/globals/user";
import { useVideoStore } from "~/lib/globals/video";

export default function Share() {
  const { video } = useVideoStore();
  const { user } = useUserStore();

  const db = getFirestore();

  const handleShare = async () => {
    if (!user || !video) return;

    await setDoc(
      doc(db, "videos", video.id),
      { shares: [...(video.shares || []), user.uid] },
      { merge: true },
    );
  };

  const url =
    typeof window !== "undefined"
      ? "https://" + window.location.host + "/v/" + video?.id
      : "";

  return (
    <RWebShare
      data={{
        text: "Check out this Meme on MemeStash!",
        url,
        title: "MemeStash",
      }}
      onClick={handleShare}
    >
      <button
        className={
          "flex flex-col items-center gap-1 p-4" +
          (user?.favorites.includes(video?.id || "not found")
            ? " text-blue-500"
            : "")
        }
      >
        <IoIosShareAlt className="text-3xl" />
        {video?.shares?.length}
      </button>
    </RWebShare>
  );
}
