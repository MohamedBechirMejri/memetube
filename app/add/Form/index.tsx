import type { Video } from "~/types/Video";
import type { ClientUploadedFileData } from "uploadthing/types";

import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LiaHashtagSolid } from "react-icons/lia";
import { MdBlock } from "react-icons/md";
import { TbX } from "react-icons/tb";
import Toggle from "~/components/Toggle";
import { firebaseConfig } from "~/lib/firebase";
import { User } from "~/types/User";
import Categories from "./Categories";
import Languages from "./Languages";

export const LANGUAGES = ["arabic", "english", "any"];

type Props = {
  user: User;
  videoData: ClientUploadedFileData<{
    uploadedBy: string;
  }>;
  onBack: () => void;
};

export default function Form({ user, videoData, onBack }: Props) {
  const [title, setTitle] = useState("");
  const [languages, setLanguages] = useState<string[]>([LANGUAGES[0]]);
  const [nsfw, setNsfw] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [categories, setCategories] = useState([] as string[]);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const router = useRouter();

  const addVideo = async () => {
    setIsSaving(true);

    const id = nanoid(8);

    const tags = title.split(" ").reduce(
      (acc, word) => {
        if (word.startsWith("#") && !acc.some((tag) => tag.name === word)) {
          acc.push({ name: word });
        }
        return acc;
      },
      [] as { name: string }[],
    );

    const v: Video = {
      id,
      name: title,
      url: videoData.url,
      uploadedBy: user.uid,
      categories,
      views: [],
      likes: [],
      comments: [],
      shares: [],
      languages,
      tags,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      nsfw,
      serverData: videoData,
    };

    await setDoc(doc(db, "videos", id), v);

    await setDoc(
      doc(db, "users", user.uid),
      { uploads: [...user.uploads, id] },
      { merge: true },
    );

    router.push(`/v/${id}`);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="grid h-full w-full grid-rows-[repeat(5,auto),minmax(0,1fr),auto] gap-4"
      onSubmit={(e) => e.preventDefault()}
    >
      {isSaving && (
        <div className="fixed left-0 top-0 z-[90] flex h-full w-full items-center justify-center bg-black bg-opacity-40 backdrop-blur">
          Saving Meme..
        </div>
      )}

      <button className="z-50 p-4 pb-0 text-3xl text-gray-500" onClick={onBack}>
        <TbX />
      </button>

      <textarea
        placeholder="Describe your meme"
        className="relative mb-4 h-40 w-full shrink-0 resize-none border-y border-slate-800 bg-transparent p-4 outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="relative top-[-2rem] -mt-14 ml-4 flex h-max w-max select-none items-center gap-1 rounded-2xl bg-white bg-opacity-30 p-2 text-xs font-medium opacity-90">
        <LiaHashtagSolid /> Hashtags
      </div>

      <Languages
        LANGUAGES={LANGUAGES}
        languages={languages}
        setLanguages={setLanguages}
      />

      <div className="my-4 flex w-full items-center justify-between px-4">
        <label className="flex items-center gap-4 text-gray-400">
          <MdBlock />
          NSFW
        </label>

        <Toggle checked={nsfw} setChecked={setNsfw} />
      </div>

      <Categories
        categories={categories}
        setCategories={setCategories}
        db={db}
      />

      <div className="flex h-max w-full items-end px-8 pb-4 ">
        <motion.button
          initial={{ paddingBlock: "0.5rem" }}
          animate={{ paddingBlock: "0.5rem" }}
          whileHover={{ paddingBlock: "0.75rem" }}
          className="w-full select-none rounded-2xl bg-orange-500 bg-opacity-15 p-2 px-8 text-orange-500"
          onClick={addVideo}
        >
          Save Meme
        </motion.button>
      </div>
    </motion.form>
  );
}
