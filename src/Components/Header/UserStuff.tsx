/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useContext, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

import uniqid from "uniqid";
import { MdLogout, MdOutlineAddBox } from "react-icons/md";
import { Link } from "react-router-dom";
import UserContext from "../../Utils/UserContext";

function Userstuff(): JSX.Element {
  const user = useContext(UserContext);

  const [isAddVideoShown, setIsAddVideoShown] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null as File | null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("0");
  const videoId = uniqid();

  const auth = getAuth();

  const db = getFirestore();

  const logOut = (): void => {
    auth.signOut();
  };
  const signIn = (): void => {
    signInWithRedirect(auth, new GoogleAuthProvider());
    setDoc(
      doc(db, "users", auth.currentUser!.uid),
      {
        displayName: auth.currentUser!.displayName,
        photoURL: auth.currentUser!.photoURL,
      },
      { merge: true }
    );
  };
  const addVideo = (videoData: {
    id: string;
    title: string;
    description: string;
    url: string;
    uploader: {
      displayName: string | null;
      photoURL: string | null;
      id: string;
    };
    likes: string[];
    dislikes: string[];
    comments: object[];
    views: number;
    date: string;
  }): void => {
    setDoc(doc(db, "videos", videoId), {
      ...videoData,
    });
  };
  const handleAddVideo = async (): Promise<void> => {
    if (video === null) {
      return;
    }
    setIsUploading(true);

    const videoRef = ref(getStorage(), `videos/${videoId}`);
    const uploadTask = uploadBytesResumable(videoRef, video);

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
            //    console.log("Upload is paused");
            break;
          case "running":
            //    console.log("Upload is running");
            break;
        }
      },
      error => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          const videoData = {
            id: videoId,
            title,
            description,
            url: downloadURL,
            uploader: {
              displayName: auth.currentUser!.displayName,
              photoURL: auth.currentUser!.photoURL,
              id: auth.currentUser!.uid,
            },
            likes: [],
            dislikes: [],
            comments: [],
            views: 0,
            date: new Date().toISOString(),
          };
          addVideo(videoData);
        });
      }
    );
  };

  return (
    <div className="flex items-center justify-center h-full gap-4 p-4 text-2xl">
      <MdOutlineAddBox
        onClick={() => {
          setIsAddVideoShown(!isAddVideoShown);
        }}
        className={` text-3xl transition-all cursor-pointer hover:scale-105 active:scale-95 ${
          isAddVideoShown && "rotate-[135deg]"
        } `}
      />
      {/* {user} */}
      {isAddVideoShown && (
        <div className="fixed z-50 flex flex-col items-center justify-center gap-4 p-8 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg dark:bg-[#1f232c] inset-1/2 w-fit h-fit ">
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
              <div>
                <label
                  htmlFor="video-file"
                  className="px-4 py-2 font-bold text-white bg-red-500 rounded-lg cursor-pointer hover:bg-red-700"
                >
                  <input
                    className="hidden"
                    type="file"
                    onChange={e => setVideo(e.target.files![0])}
                    id="video-file"
                  />
                  Select Video
                </label>
                <button
                  type="button"
                  className="px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700"
                  onClick={handleAddVideo}
                >
                  Add Video
                </button>
              </div>
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
      )}{" "}
      {!user ? (
        <button
          type="button"
          className="px-4 py-2 w-max text-xl font-semibold border border-[#cf2d2b] mx-1 rounded-lg hover:bg-[#cf2d2b] transition-all active:scale-95"
          onClick={signIn}
        >
          Sign In
        </button>
      ) : (
        <div className="flex items-center justify-center gap-4 mx-1 text-xl font-semibold rounded-lg w-max">
          <Link
            to={`/user/${auth.currentUser!.uid}`}
            className="transition-all rounded-full hover:ring w-max active:scale-95"
          >
            <img
              className="rounded-full max-h-9"
              src={auth.currentUser!.photoURL || ""}
              alt="user"
            />
          </Link>
          <button
            type="button"
            onClick={logOut}
            className="px-3 py-2 w-max border border-[#cf2d2b] mx-1 rounded-lg hover:bg-[#cf2d2b] transition-all active:scale-95"
          >
            <MdLogout />
          </button>
        </div>
      )}
    </div>
  );
}

export default Userstuff;
