"use client";

import { UploadDropzone } from "~/utils/uploadthing";

export default function Add() {
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
      />
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
        className="h-full w-full rounded-lg bg-slate-950 p-4 text-white"
      />
    </main>
  );
}
