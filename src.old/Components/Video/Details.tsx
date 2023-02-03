/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import turnNumerIntoWords from "../../Utils/turnNumbersIntoWords";

function Details({
  description,
  uploader,
}: {
  description: string;
  uploader: string;
}): JSX.Element {
  const [channel, setChannel] = useState(null as any);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;
  useEffect(() => {
    const channelRef = doc(
      db,
      `users`,
      uploader! || "xvlvn3KIxNOnLvtuQwYgLLpNk8W2"
    );
    getDoc(channelRef).then(channelData => {
      setChannel(channelData.data() as any);
      setIsSubscribed(channel.subscribers.includes(user!.uid));
    });
  }, [uploader]);

  const handleSubscribe = (): void => {
    const channelRef = doc(db, `users`, uploader!);

    if (user === null) {
      return;
    }

    if (isSubscribed) {
      setDoc(
        channelRef,
        {
          subscribers: channel.subscribers.filter(
            (subscriber: string) => subscriber !== user.uid
          ),
        },
        { merge: true }
      );
      setIsSubscribed(false);
    } else {
      setDoc(
        channelRef,
        {
          subscribers: [...channel.subscribers, user.uid],
        },
        { merge: true }
      );
      setIsSubscribed(true);
    }
  };

  return !channel ? (
    <div>Loading...</div>
  ) : (
    <div className="flex flex-col gap-3 p-1">
      <div className="flex items-center justify-between">
        <Link
          to={`/user/${channel.uid}`}
          className="flex items-center justify-start"
        >
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
        </Link>
        {user && user.uid !== channel.uid && (
          <button
            type="button"
            className={`" border-[#cf2d2b] border-2 py-2 px-4 m-2 rounded-lg hover:bg-[#cf2d2b] ${
              isSubscribed && "bg-[#cf2d2b] hover:bg-[#cf2e2b83] "
            } active:scale-[.98] transition-all hover:text-white text-sm font-medium "`}
            onClick={handleSubscribe}
          >
            {isSubscribed ? "Unsubscribe" : "Subscribe"}
          </button>
        )}
      </div>
      <p className="px-20">{description}</p>
    </div>
  );
}

export default Details;
