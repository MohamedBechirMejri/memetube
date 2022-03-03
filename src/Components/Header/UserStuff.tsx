/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useContext, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import uniqid from "uniqid";
import { MdOutlineAddBox } from "react-icons/md";
import UserContext from "../../Utils/UserContext";

function Userstuff(): JSX.Element {
  const user: {
    name: string;
  } = useContext(UserContext);

  const [isAddVideoShown, setIsAddVideoShown] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null as File | null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("0");

  const handleAddVideo = async (): Promise<void> => {
    if (video === null) {
      return;
    }

    const videoRef = ref(getStorage(), `videos/${uniqid()}`);
    const uploadTask = uploadBytesResumable(videoRef, video);
    setIsUploading(true);

    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = (
          (snapshot.bytesTransferred / snapshot.totalBytes) *
          100
        ).toFixed(0);
        setUploadProgress(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      error => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  return !user.name ? (
    <div className="flex items-center justify-center h-full gap-4 p-4 text-2xl">
      <MdOutlineAddBox
        onClick={() => {
          setIsAddVideoShown(!isAddVideoShown);
        }}
        className={` text-3xl transition-all cursor-pointer hover:scale-105 active:scale-95 ${
          isAddVideoShown && "rotate-[135deg]"
        } `}
      />
      {user.name}
      {isAddVideoShown && (
        <div className="fixed z-50 flex flex-col items-center justify-center gap-4 p-4 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg dark:bg-[#1f232c] inset-1/2 w-fit h-fit ">
          {!isUploading ? (
            <>
              <label
                htmlFor="title"
                className="flex flex-col items-start justify-start"
              >
                Title
                <input
                  type="text"
                  className="bg-transparent border rounded-lg"
                  id="title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </label>
              <label
                htmlFor="description"
                className="flex flex-col items-start justify-start"
              >
                Description
                <textarea
                  className="bg-transparent border rounded-lg"
                  id="description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </label>{" "}
              <label htmlFor="video-file">
                <input
                  type="file"
                  onChange={e => setVideo(e.target.files![0])}
                />
              </label>
              <button
                type="button"
                className="px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700"
                onClick={handleAddVideo}
              >
                Add Video
              </button>
            </>
          ) : (
            <>
              <h1 className="p-8 animate-pulse">
                {" "}
                {uploadProgress}% uploaded.
              </h1>
              {/* <span className="p-4 bg-white rounded-full animate-pulse" /> */}
              {/* <div className="flex gap-2 ">
                <button
                  type="button"
                  className="px-4 py-2 text-lg font-bold text-white uppercase transition-all bg-green-500 rounded hover:bg-green-700 active:scale-95"
                >
                  cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-lg font-bold text-white uppercase transition-all bg-green-500 rounded hover:bg-green-700 active:scale-95"
                >
                  pause
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-lg font-bold text-white uppercase transition-all bg-green-500 rounded hover:bg-green-700 active:scale-95"
                >
                  resume
                </button>
              </div> */}
            </>
          )}
        </div>
      )}
    </div>
  ) : (
    <button
      type="button"
      className="px-4 py-2 text-xl font-semibold border border-[#cf2d2b] mx-1 rounded-lg hover:bg-[#cf2d2b] transition-all active:scale-95"
    >
      login
    </button>
  );
}

export default Userstuff;
