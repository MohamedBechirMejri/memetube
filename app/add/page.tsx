"use client";

import { UploadDropzone } from "~/utils/uploadthing";

export default function Add() {
  return (
    <main className="flex h-full flex-col items-center justify-center p-24">
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
        className="rounded-lg border-2 border-slate-500 bg-slate-950 p-4 text-white"
      />
    </main>
  );
}
