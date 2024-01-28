"use client";

import { child, get, getDatabase, ref, set } from "firebase/database";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { UploadDropzone } from "~/utils/uploadthing";

export default function Add() {
  const [title, setTitle] = useState("");
  const router = useRouter();

  const addVideo = useCallback(
    (res: any) => {
      const dbRef = ref(getDatabase());
      get(child(dbRef, `videos/`))
        .then(async (snapshot) => {
          if (snapshot.exists()) {
            const id = new Crypto().randomUUID();
            const db = await getDatabase();

            await set(ref(db, "videos/" + id), {
              title,
              likes: 0,
              comments: [],
              ...res,
            });
          }
        })
        .then(() => {
          setTitle("");
          router.push("/");
        })
        .catch((error) => console.error(error));
    },
    [router, title],
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
        onClientUploadComplete={(res) => addVideo(res)}
        onUploadError={(error: Error) => alert(`ERROR! ${error.message}`)}
        className="h-full w-full rounded-lg bg-slate-950 p-4 text-white"
      />
    </main>
  );
}
