import type { Tag, Video } from "~/types/Video";

import { useState } from "react";
import { ClientUploadedFileData } from "uploadthing/types";
import { nanoid } from "nanoid";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "~/lib/firebase";
import { useRouter } from "next/router";
import { User } from "~/types/User";

const LANGUAGES = ["arabic", "english"];

type Props = {
  user: User;
  videoData: ClientUploadedFileData<{
    uploadedBy: string;
  }>;
};

export default function Form({ user, videoData }: Props) {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [languages, setLanguages] = useState<string[]>([LANGUAGES[0]]);

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
      tags,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      serverData: videoData,
    } as Video);

    setTitle("");
    router.push(`/v/${id}`);
  };

  return (
    <form>
      <label className="mb-3 mt-4 w-full px-2 text-left">Add a title:</label>
      <input
        type="text"
        placeholder="Something relevant"
        className="mb-4 w-full rounded-xl border border-slate-700 bg-transparent p-4 py-2 text-xl outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label className="mb-2 w-full">Tags:</label>

      <div className="flex w-full flex-wrap">
        {tags.map((tag, i) => (
          <span
            key={"tag" + i + tag}
            className="m-1 rounded-xl bg-slate-950 p-2 text-white"
          >
            {tag.name}
          </span>
        ))}
      </div>

      <div className="flex w-full gap-4">
        <input
          type="text"
          placeholder="jump scare, weird, old tiktokers, nsfw, etc..."
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="mb-4 w-full rounded-xl border border-slate-700 bg-transparent p-4 py-2 text-xl outline-none"
        />
        <button
          className="mb-4 w-32 rounded-xl bg-slate-950 p-4 text-white"
          onClick={() => {
            if (tag) {
              setTags([...tags, { name: tag }]);
              setTag("");
            }
          }}
        >
          Add tag
        </button>
      </div>

      <label className="mb-2 w-full">Language:</label>

      <div className="flex w-full gap-4">
        {LANGUAGES.map((lang, i) => (
          <button
            key={"lang" + i + lang}
            className="m-1 rounded-xl bg-slate-950 p-2 capitalize text-white"
            onClick={() => {
              setLanguages([lang]);
            }}
          >
            {lang}
          </button>
        ))}
      </div>
    </form>
  );
}
