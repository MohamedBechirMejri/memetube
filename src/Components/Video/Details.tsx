/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import turnNumerIntoWords from "../../Utils/turnNumbersIntoWords";

function Details({
  description,
  uploader,
}: {
  description: string;
  uploader: string;
}): JSX.Element {
  const [channel, setChannel] = useState({
    displayName: "",
    photoURL: "",
    subscribers: [],
  } as any);
  useEffect(() => {
    const db = getFirestore();
    const channelRef = doc(
      db,
      `users`,
      uploader! || "xvlvn3KIxNOnLvtuQwYgLLpNk8W2"
    );
    getDoc(channelRef).then(channelData =>
      setChannel(channelData.data() as any)
    );
  }, [uploader]);
  return (
    <div className="flex flex-col gap-3 p-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start">
          <img
            src={channel.photoURL}
            alt="Channel Logo"
            className="w-12 h-12 m-2 rounded-[.65em] shadow-lg"
          />
          <div className="flex flex-col items-start justify-center">
            <h2 className="font-bold">{channel.displayName}</h2>
            <p className="text-xs text-gray-400 ">
              {turnNumerIntoWords(channel.subscribers.length)} subscribers
            </p>
          </div>
        </div>
        <button
          type="button"
          className="border-[#cf2d2b] border-2 py-2 px-4 m-2 rounded-lg hover:bg-[#cf2d2b] active:scale-[.98] transition-all hover:text-white text-sm font-medium"
        >
          Subscribe
        </button>
      </div>
      <p className="px-20">{description}</p>
    </div>
  );
}

export default Details;
