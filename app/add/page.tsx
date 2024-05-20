"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ClientUploadedFileData } from "uploadthing/types";
import { useUserStore } from "~/lib/globals/user";
import { UploadDropzone } from "~/utils/uploadthing";
import Form from "./Form";

export default function Add() {
  const [videoData, setVideoData] = useState<ClientUploadedFileData<{
    uploadedBy: string;
  }> | null>(null);

  const router = useRouter();

  const { user } = useUserStore();

  useEffect(() => {
    if (!user) return router.push("/login");
  }, [user, router]);

  return (
    <main className="relative flex h-full flex-col items-center justify-center overflow-y-scroll p-4">
      {videoData ? (
        <Form videoData={videoData} user={user!} onBack={() => setVideoData(null)} />
      ) : (
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            console.log(res);
            setVideoData(res[0]);
          }}
          onUploadError={(error: Error) => {
            console.log(error);
            alert(`ERROR! ${error.message}`);
          }}
          className="h-full w-full rounded-lg bg-slate-950 p-4 text-white"
        />
      )}
    </main>
  );
}
