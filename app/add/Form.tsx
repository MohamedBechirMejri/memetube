import type { Tag, Video } from "~/types/Video";

import { useState } from "react";
import { ClientUploadedFileData } from "uploadthing/types";
import { nanoid } from "nanoid";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "~/lib/firebase";
import { useRouter } from "next/navigation";
import { User } from "~/types/User";
import { LiaCheckSolid, LiaHashtagSolid } from "react-icons/lia";
import { GrLanguage } from "react-icons/gr";
import { MdBlock } from "react-icons/md";
import { motion } from "framer-motion";

const LANGUAGES = ["arabic", "english", "other"];

type Props = {
  user: User;
  videoData: ClientUploadedFileData<{
    uploadedBy: string;
  }>;
  onBack: () => void;
};

export default function Form({ user, videoData }: Props) {
  const [title, setTitle] = useState("");
  const [languages, setLanguages] = useState<string[]>([LANGUAGES[0]]);
  const [nsfw, setNsfw] = useState(false);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const router = useRouter();

  const addVideo = async () => {
    const id = nanoid(8);

    await setDoc(doc(db, "videos", id), {
      id,
      name: title,
      url: videoData.url,
      uploadedBy: user.uid,
      categories: [],
      views: [],
      likes: [],
      comments: [],
      languages,
      tags: title
        .split(" ")
        .filter((word) => word.startsWith("#"))
        .map((tag) => ({ name: tag })),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      serverData: videoData,
    } as Video);

    setTitle("");
    router.push(`/v/${id}`);
  };

  return (
    <form
      className="flex h-full w-full flex-col gap-4 pt-16"
      onSubmit={(e) => e.preventDefault()}
    >
      <textarea
        placeholder="Describe your meme"
        className="relative mb-4 h-40 w-full resize-none border-y border-slate-700 bg-transparent p-4 py-2 text-xl outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="relative top-[-4rem] -mt-4 ml-4 flex w-max items-center gap-1 rounded-2xl border p-1 px-3 text-xs font-medium">
        <LiaHashtagSolid /> Hashtags
      </div>

      <div className="flex w-full items-center justify-between px-4">
        <label className="flex items-center gap-4 text-gray-400">
          <GrLanguage />
          Language
        </label>

        <div className="flex gap-4">
          {LANGUAGES.map((lang, i) => (
            <button
              key={"lang" + i + lang}
              className={
                "flex items-center gap-2 rounded-xl p-2 capitalize" +
                (languages.includes(lang)
                  ? " border border-current text-rose-400"
                  : "")
              }
              onClick={() => {
                setLanguages([lang]);
              }}
            >
              {lang} {languages.includes(lang) && <LiaCheckSolid />}
            </button>
          ))}
        </div>
      </div>

      <div className="flex w-full items-center justify-between px-4">
        <label className="flex items-center gap-4 text-gray-400">
          <MdBlock />
          NSFW
        </label>

        <button
          className="ri ng relative flex h-8 w-16 gap-4 rounded-full bg-gray-500 bg-opacity-30"
          onClick={() => setNsfw(!nsfw)}
        >
          <motion.span
            initial={{
              x: nsfw ? "100%" : "0%",
              backgroundColor: nsfw ? "#14b8a6" : "#f43f5e",
            }}
            animate={{
              x: nsfw ? "100%" : "0%",
              backgroundColor: nsfw ? "#14b8a6" : "#f43f5e",
            }}
            className="absolute size-8 rounded-full shadow-md"
          />
        </button>
      </div>
    </form>
  );
}
