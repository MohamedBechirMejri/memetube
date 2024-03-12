"use client";

import type { Video } from "~/types/Video";

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
  const router = useRouter();

  const { user } = useUserStore();

  console.log(user);

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const addVideo = useCallback(
    async (res: any) => {
      if (!user) return router.push("/login");

      const id = nanoid(8);

      await setDoc(doc(db, "videos", id), {
        name: title,
        url: res.url,
        uploadedBy: user.uid,
        categories: [],
        views: [],
        likes: [],
        comments: [],
        languages: [],
        tags: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        serverData: res,
      } as Video);

      setTitle("");
      router.push(`/v/${id}`);
    },
    [db, router, title, user],
  );

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
