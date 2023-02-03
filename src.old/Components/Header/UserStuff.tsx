/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useContext, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

import uniqid from "uniqid";
import { MdLogout, MdOutlineAddBox } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../Utils/UserContext";
import VideoData from "../../Types/VideoData";

function Userstuff(): JSX.Element {
  const user = useContext(UserContext);

  const navigate = useNavigate();

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
    signInWithPopup(auth, new GoogleAuthProvider()).then(result => {
      const userdata = result.user;

      setDoc(
        doc(db, "users", userdata.uid),
        {
          displayName: userdata.displayName,
          photoURL: userdata.photoURL,
          subscribers: [],
          uid: userdata.uid,
        },
        { merge: true }
      );
    });
  };
  const addVideo = (videoData: VideoData): void => {
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
            views: [],
            date: new Date().toISOString(),
          };
          addVideo(videoData);
          setIsUploading(false);
          setIsAddVideoShown(false);
          navigate(`/video/${videoId}`);
        });
      }
    );
  };

  return (
    <div className="flex items-center justify-center h-full gap-4 p-4 text-2xl select-none">
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
        <div className="fixed z-50 flex flex-col items-center justify-center gap-4 p-8 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg dark:bg-[#202124] inset-1/2 w-fit h-fit border border-[#202124] dark:border-white animate-revealAddVideo ">
          {!isUploading ? (
            <>
              <label
                htmlFor="title"
                className="flex flex-col items-start justify-start"
              >
                <input
                  type="text"
                  className="text-center bg-transparent outline-none placeholder:text-center focus:border-b"
                  id="title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Title"
                />
              </label>
              <label
                htmlFor="description"
                className="flex flex-col items-start justify-start "
              >
                <textarea
                  className="text-center bg-transparent outline-none placeholder:text-center focus:border-b"
                  id="description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Description"
                />
              </label>{" "}
              <div className="">
                <label
                  htmlFor="video-file"
                  className="px-4 py-2 mx-4 font-bold text-white bg-red-500 rounded-lg cursor-pointer hover:bg-red-700"
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
