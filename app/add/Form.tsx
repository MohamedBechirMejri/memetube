import type { Video } from "~/types/Video";

import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getFirestore,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GrLanguage } from "react-icons/gr";
import { LiaCheckSolid, LiaHashtagSolid } from "react-icons/lia";
import { MdBlock, MdCategory } from "react-icons/md";
import { TbX } from "react-icons/tb";
import { ClientUploadedFileData } from "uploadthing/types";
import Toggle from "~/components/Toggle";
import { firebaseConfig } from "~/lib/firebase";
import { User } from "~/types/User";

const LANGUAGES = ["arabic", "english", "any"];

type TCategory = {
  name: string;
  image: string;
  id: string;
};

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
  const [CATEGORIES, setCATEGORIES] = useState<TCategory[]>([]);

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

    // setTitle("");
    // setLanguages([LANGUAGES[0]]);
    // setNsfw(false);

    await setDoc(
      doc(db, "users", user.uid),
      {
        uploads: [...user.uploads, id],
      },
      { merge: true },
    );

    router.push(`/v/${id}`);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "categories"),
      (snapshot) => {
        const cats = snapshot.docs.map((doc) => doc.data()) as TCategory[];
        setCATEGORIES(cats);
      },
      (error) => console.error(error),
    );

    return () => unsubscribe();
  }, [db]);

  return (
    <form
      className="grid h-full w-full grid-rows-[auto,auto,auto,auto,auto,minmax(0,1fr),auto] gap-4"
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

      <div className="grid h-full w-full grid-rows-[auto,minmax(0,1fr)] gap-4 p-4 pt-0">
        <label className="flex items-center gap-4 text-gray-400">
          <MdCategory />
          Categories
        </label>

        <div className="flex h-max max-h-full flex-wrap gap-4 overflow-y-auto rounded-2xl bg-slate-800 bg-opacity-10 p-4">
          {CATEGORIES.map((category, i) => {
            return (
              <button
                key={category.id}
                className={
                  "flex h-max items-center gap-1 rounded-2xl p-4 text-sm font-medium capitalize leading-none" +
                  (categories.includes(category.id)
                    ? " bg-blue-500 bg-opacity-15 text-blue-500"
                    : " bg-slate-900 bg-opacity-40 text-slate-300")
                }
                onClick={() => {
                  setCategories((cats) => {
                    if (cats.includes(category.id))
                      return cats.filter((cat) => cat !== category.id);
                    else return [...cats, category.id];
                  });
                }}
              >
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

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
    </form>
  );
}
