import { initializeApp } from "firebase/app";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { firebaseConfig } from "~/lib/firebase";
import { useUserStore } from "~/lib/globals/user";
import { useVideoStore } from "~/lib/globals/video";
import { Video } from "~/types/Video";

export default function VideosLoader() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const { user } = useUserStore();
  const { setCollection, setRawCollection } = useVideoStore();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "videos"),
      (snapshot) => {
        const videos = snapshot.docs.map((doc) => doc.data()) as Video[];

        const filtered = videos.filter((v) => {
          const { nsfw, languages } = v;
          const { nsfw: userNSFW, language: userLanguage } =
            user?.preferences || {};

          if (nsfw && !userNSFW) return false;

          if (userLanguage === "any") return true;

          if (
            languages &&
            !languages.includes(userLanguage || "any") &&
            !languages.includes("any")
          )
            return false;

          return true;
        });

        setCollection(filtered);
        setRawCollection(videos);
      },
      (error) => console.error(error),
    );

    return () => unsubscribe();
  }, [db, setCollection, setRawCollection, user?.preferences]);

  return null;
}
