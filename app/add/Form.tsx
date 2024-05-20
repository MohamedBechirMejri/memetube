import type { Video } from "~/types/Video";

import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GrLanguage } from "react-icons/gr";
import { LiaCheckSolid, LiaHashtagSolid } from "react-icons/lia";
import { MdBlock, MdCategory } from "react-icons/md";
import { TbX } from "react-icons/tb";
import { ClientUploadedFileData } from "uploadthing/types";
import { firebaseConfig } from "~/lib/firebase";
import { User } from "~/types/User";
import Toggle from "../_components/Toggle";

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
      nsfw,
      serverData: videoData,
    } as Video);

    setTitle("");
    router.push(`/v/${id}`);
  };

  return (
    <form
      className="flex h-full w-full flex-col gap-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <button className="p-4 pb-0 text-3xl text-gray-500">
        <TbX />
      </button>

      <textarea
        placeholder="Describe your meme"
        className="relative mb-4 h-40 w-full resize-none border-y border-slate-800 bg-transparent p-4 outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="relative top-[-2rem] -mt-12 ml-4 flex w-max select-none items-center gap-1 rounded-2xl bg-white bg-opacity-30 p-1 px-2 text-xs font-medium opacity-90">
        <LiaHashtagSolid /> Hashtags
      </div>

      <div className="flex w-full items-center justify-between px-4">
        <label className="flex items-center gap-4 text-gray-400">
          <GrLanguage />
          Language
        </label>

        <div className="flex gap-4">
          {LANGUAGES.map((lang, i) => {
            const isSelected = languages.includes(lang);
            const buttonAnimation = {
              color: isSelected ? "#14b8a6" : "#fff",
              backgroundColor: isSelected ? "#14b8a633" : "#ffffff00",
            };
            const tickAnimation = {
              width: isSelected ? "max-content" : 0,
              opacity: isSelected ? 1 : 0,
            };

            return (
              <motion.button
                initial={buttonAnimation}
                animate={buttonAnimation}
                key={"lang" + i + lang}
                className="flex items-center gap-2 rounded-xl p-2 capitalize"
                onClick={() => setLanguages([lang])}
              >
                {lang}
                <motion.span initial={tickAnimation} animate={tickAnimation}>
                  <LiaCheckSolid />
                </motion.span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="my-4 flex w-full items-center justify-between px-4">
        <label className="flex items-center gap-4 text-gray-400">
          <MdBlock />
          NSFW
        </label>

        <Toggle checked={nsfw} setChecked={setNsfw} />
      </div>

      <div className="flex w-full items-center justify-between px-4 opacity-40">
        <label className="flex items-center gap-4 text-gray-400">
          <MdCategory />
          Categories
        </label>
        Soon..
      </div>

      <div className="flex h-full w-full items-end p-8 pb-12 ">
        <button
          className="w-full rounded-2xl bg-rose-500 bg-opacity-15 p-2 px-8 text-rose-500"
          onClick={addVideo}
        >
          Save Meme
        </button>
      </div>
    </form>
  );
}
