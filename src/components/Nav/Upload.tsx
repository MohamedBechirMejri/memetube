import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { RiVideoUploadLine } from "react-icons/ri";
import { nanoid } from "nanoid";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
// import { useRouter } from "next/router";

const Upload = ({
  setIsUploadOpen,
  user,
}: {
  setIsUploadOpen: (arg: boolean) => void;
  user: {
    displayName: string;
    photoURL: string;
    uid: string;
  };
}) => {
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState(null as File | null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoData, setVideoData] = useState(
    null as { id: string; url: string } | null
  );

  // const router = useRouter();

  const addVideo = () => {
    if (!user) return toast.error("You can't upload until you Login!");

    if (!videoData) return;

    const { id, url } = videoData;
    const { displayName, photoURL, uid } = user;

    setDoc(doc(getFirestore(), "videos", id), {
      id,
      title,
      url,
      uploader: { displayName, photoURL, id: uid },
      likes: [],
      comments: [],
      date: new Date().toISOString(),
    })
      .then(() => {
        setIsUploadOpen(false);

        // void router.push(`/v/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (video) {
      const videoId = nanoid();

      const videoRef = ref(getStorage(), `videos/${videoId}`);
      const uploadTask = uploadBytesResumable(videoRef, video);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (
            (snapshot.bytesTransferred / snapshot.totalBytes) *
            100
          ).toFixed(0);
          setUploadProgress(+progress);
        },
        (err) => {
          console.log(err);
        },
        () => {
          void getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const videoData = { id: videoId, url: downloadURL };
            setVideoData(videoData);
          });
        }
      );
    }
  }, [video]);

  return (
    <div className="fixed top-0 left-1/2 z-[70] h-[100svh] w-[100svw] max-w-3xl -translate-x-1/2 p-4 backdrop-brightness-90 transition-all">
      <motion.div
        initial={{ y: "-100%", opacity: 0, x: "0" }}
        animate={{ y: "0%", opacity: 1 }}
        exit={{ y: "-100%", opacity: 0, transition: { duration: 0.3 } }}
        transition={{ type: "spring", damping: 10, stiffness: 55 }}
        className="grid h-full w-full grid-rows-[auto,auto,1fr,auto] gap-4 rounded-2xl bg-white p-4 elevation-8"
      >
        <div className="flex items-center justify-between px-2">
          <h1 className="text-xl font-semibold">Add Meme</h1>
          <button
            className="text-2xl transition-all hover:text-red-600"
            onClick={() => setIsUploadOpen(false)}
          >
            <AiOutlineCloseCircle />
          </button>
        </div>
        <input
          type="text"
          placeholder="Title"
          className="h-12 rounded-2xl text-center transition-all elevation-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {!video ? (
          <div className="relative rounded-2xl transition-all elevation-4 hover:bg-gray-100">
            <motion.div
              initial={{ width: "0%", height: "100%" }}
              animate={{ width: "100%", height: "100%" }}
              transition={{ duration: 0.35, delay: 1 }}
              className="absolute inset-0 rounded-2xl border-t-2 border-dashed border-black"
            />
            <motion.div
              initial={{ width: "100%", height: "0%" }}
              animate={{ width: "100%", height: "100%" }}
              transition={{ duration: 0.35, delay: 0.35 + 1 }}
              className="absolute inset-0 rounded-2xl border-r-2 border-dashed border-black"
            />
            <motion.div
              initial={{ width: "0%", height: "100%" }}
              animate={{ width: "100%", height: "100%" }}
              transition={{ duration: 0.35, delay: 0.35 + 1 }}
              className="absolute inset-0 rounded-2xl border-b-2 border-dashed border-black"
            />
            <motion.div
              initial={{ width: "100%", height: "0%" }}
              animate={{ width: "100%", height: "100%" }}
              transition={{ duration: 0.35, delay: 1 }}
              className="absolute inset-0 rounded-2xl border-l-2 border-dashed border-black"
            />
            <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-5xl">
              <RiVideoUploadLine />
              <p className="text-sm">Select a Video or Drop It Here</p>
            </div>
            <input
              type="file"
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              onChange={(e) => setVideo(e.target.files[0])}
            />
          </div>
        ) : (
          <div
            className={
              "flex h-full w-full flex-col items-center justify-center gap-4 " +
              (uploadProgress < 100 ? "animate-pulse" : "")
            }
          >
            <h1 className="text-5xl font-extrabold">
              {uploadProgress < 100 ? `${uploadProgress}%` : "Uploaded!"}
            </h1>
            {uploadProgress < 100 && <h2>{video.name}</h2>}
          </div>
        )}
        <button
          className="rounded-2xl bg-green-100 py-4 text-xl transition-all elevation-2 hover:bg-green-200 active:elevation-0"
          onClick={addVideo}
        >
          Upload
        </button>
      </motion.div>
    </div>
  );
};

export default Upload;
