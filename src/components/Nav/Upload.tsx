import { motion } from "framer-motion";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { RiVideoUploadLine } from "react-icons/ri";

const Upload = ({
  setIsUploadOpen,
}: {
  setIsUploadOpen: (arg: boolean) => void;
}) => {
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
        />
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
          />
        </div>
        <button className="rounded-2xl bg-green-100 py-4 text-xl transition-all elevation-2 hover:bg-green-200 active:elevation-0">
          Upload
        </button>
      </motion.div>
    </div>
  );
};

export default Upload;
