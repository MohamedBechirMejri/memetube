"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ClientUploadedFileData } from "uploadthing/types";
import { useUserStore } from "~/lib/globals/user";
import { UploadDropzone } from "~/utils/uploadthing";
import Form from "./Form";
import { sleep } from "~/lib/utils";

export default function Add() {
  const [videoData, setVideoData] = useState<ClientUploadedFileData<{
    uploadedBy: string;
  }> | null>(null);

  const router = useRouter();

  const { user } = useUserStore();

  useEffect(() => {
    const checkUser = async () => {
      await sleep(2000);
      if (!user) return router.push("/login");
    };

    checkUser();
  }, [user, router]);

  return (
    <main className="relative flex h-full flex-col items-center justify-center overflow-y-scroll">
      {videoData ? (
        <Form
          videoData={videoData}
          user={user!}
          onBack={() => setVideoData(null)}
        />
      ) : (
        <UploadDropzone
          endpoint="imageUploader"
          className="h-full w-full rounded-lg border-0 bg-slate-950 p-4 text-white"
          onClientUploadComplete={(res) => {
            console.log(res);
            setVideoData(res[0]);
          }}
          onUploadError={(error: Error) => {
            console.log(error);
            alert(`ERROR! ${error.message}`);
          }}
        />
      )}
    </main>
  );
}
