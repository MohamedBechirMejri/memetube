"use client";

import type { Tag, Video } from "~/types/Video";

import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { firebaseConfig } from "~/lib/firebase";
import { UploadDropzone } from "~/utils/uploadthing";
import { useUserStore } from "~/lib/globals/user";

export default function Add() {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [language, setLanguage] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  const router = useRouter();

  const { user } = useUserStore();

  console.log(user);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const addVideo = async (res: any) => {
    if (!user) return router.push("/login");

    const id = nanoid(8);

    await setDoc(doc(db, "videos", id), {
      name: title,
      url: res.url,
      uploadedBy: user.uid,
      categories,
      views: [],
      likes: [],
      comments: [],
      languages,
      tags,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      serverData: res,
    } as Video);

    setTitle("");
    router.push(`/v/${id}`);
  };

  return (
    <main className="flex h-full flex-col items-center justify-center p-4">
      <h1 className="p-2 text-2xl capitalize">Upload a new meme</h1>
      <label className="mb-3 mt-4 w-full px-2 text-left capitalize">
        Add a title:
      </label>
      <input
        type="text"
        placeholder="something relevant"
        className="mb-4 w-full rounded-xl border border-slate-700 bg-transparent p-4 py-2 text-xl outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label className="flex w-full flex-col gap-2">Tags:</label>

      <div className="flex flex-wrap w-full">
        {tags.map((tag, i) => (
          <span
            key={"tag" + i + tag}
            className="m-1 rounded-xl bg-slate-950 p-2 text-white"
          >
            {tag.name}
          </span>
        ))}
      </div>

      <input
        type="text"
        placeholder="tag"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        className="mb-4 w-full rounded-xl border border-slate-700 bg-transparent p-4 py-2 text-xl outline-none"
      />
      <button
        className="mb-4 w-full rounded-xl bg-slate-950 p-4 text-white"
        onClick={() => {
          if (tag) {
            setTags([...tags, { name: tag }]);
            setTag("");
          }
        }}
      >
        Add tag
      </button>

      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log(res);
          addVideo(res[0]);
        }}
        onUploadError={(error: Error) => {
          console.log(error);
          alert(`ERROR! ${error.message}`);
        }}
        className="h-full w-full rounded-lg bg-slate-950 p-4 text-white"
      />
    </main>
  );
}
