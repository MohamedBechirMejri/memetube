import { doc, getFirestore, setDoc } from "firebase/firestore";
import { RxBookmarkFilled } from "react-icons/rx";
import { useUserStore } from "~/lib/globals/user";
import { useVideoStore } from "~/lib/globals/video";

export default function Save() {
  const { video } = useVideoStore();
  const { user } = useUserStore();

  const db = getFirestore();

  const handleSave = async () => {
    if (!user || !video) return;

    let saves;

    if (user.favorites.includes(video.id))
      saves = user.favorites.filter((save) => save !== video.id);
    else saves = [...user.favorites, video.id];

    await setDoc(
      doc(db, "users", user.uid),
      { favorites: saves },
      { merge: true },
    );
  };

  return (
    <button
      onClick={handleSave}
      className={
        "flex flex-col items-center gap-1 p-4" +
        (user?.favorites.includes(video?.id || "not found")
          ? " text-blue-500"
          : "")
      }
    >
      {<RxBookmarkFilled className="text-3xl" />}
    </button>
  );
}
