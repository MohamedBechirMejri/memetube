import { doc, getFirestore, setDoc } from "firebase/firestore";
import { IoHeart } from "react-icons/io5";
import { useUserStore } from "~/lib/globals/user";
import { useVideoStore } from "~/lib/globals/video";

export default function Like() {
  const { video } = useVideoStore();
  const { user, setUser } = useUserStore();

  const db = getFirestore();

  const handleLike = async () => {
    if (!user || !video) return;

    let likes;

    if (video.likes.includes("users/" + user.uid)) {
      likes = video.likes.filter((like) => like !== "users/" + user.uid);
    } else {
      likes = [...video.likes, "users/" + user.uid];
    }

    await setDoc(doc(db, "videos", video.id), { likes }, { merge: true });
  };

  return (
    <button
      onClick={handleLike}
      className={
        "flex flex-col items-center gap-1 p-4" +
        (video?.likes.includes("users/" + user?.uid) ? " text-red-500" : "")
      }
    >
      {<IoHeart className="text-3xl" />}
      <span>{video?.likes.length}</span>
    </button>
  );
}
