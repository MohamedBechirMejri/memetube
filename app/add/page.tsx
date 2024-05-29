"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ClientUploadedFileData } from "uploadthing/types";
import { useUserStore } from "~/lib/globals/user";
import useUserCheck from "~/lib/hooks/useUserCheck";
import { UploadDropzone } from "~/utils/uploadthing";
import Form from "./Form";
import { AnimatePresence } from "framer-motion";

export default function Add() {
  const [videoData, setVideoData] = useState<ClientUploadedFileData<{
    uploadedBy: string;
  }> | null>(null);

  const { user } = useUserStore();
  const router = useRouter();

  useUserCheck({ user, router });

  return (
    <main className="relative flex h-full flex-col items-center justify-center overflow-y-scroll">
      <AnimatePresence>
        {videoData ? (
          <Form
            key={"meme-form"}
            videoData={videoData}
            user={user!}
            onBack={() => setVideoData(null)}
          />
        ) : (
          <UploadDropzone
            key={"meme-upload-dropzone"}
            endpoint="imageUploader"
            className="h-full w-full rounded-lg border-0 bg-slate-950 p-4 text-white"
            onClientUploadComplete={(res) => {
              // console.log(res);
              setVideoData(res[0]);
            }}
            onUploadError={(error: Error) => {
              console.log(error);
              alert(`ERROR! ${error.message}`);
            }}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
