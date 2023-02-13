/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Buttons from "../../components/Buttons";
import Video from "../../components/Video";

const User = ({ profile }) => {
  const [db] = useState(getFirestore());
  const [videos, setVideosList] = useState([]);

  useEffect(() => {
    const videosRef = collection(db, "videos");
    const videosQuery = query(
      videosRef,
      where("uploader.id", "==", profile.uid)
    );
    const unsubscribe = onSnapshot(videosQuery, (snapshot) => {
      const videos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVideosList(videos);
    });
    return () => unsubscribe();
  }, [db, profile.uid]);

  return (
    <>
      <Head>
        <title>{profile.displayName} | MemeTube</title>
        <meta name="description" content="Top memes around the web" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="flex h-full flex-col items-center gap-4 overflow-y-scroll py-12 pt-24 scrollbar-none">
        <Image
          width={96}
          height={96}
          alt="user"
          className="relative z-10 h-24 w-24 rounded-full text-3xl transition-all hover:elevation-2"
          // @ts-ignore
          src={profile.photoURL}
          draggable={false}
        />
        <h1 className="text-2xl">{profile.displayName}</h1>
        {videos.map((video) => (
          <div
            key={video.id}
            className="grid h-[100svh] w-full shrink-0 grid-rows-[auto,1fr,auto] overflow-hidden bg-white p-4"
          >
            <h1 className="p-4 text-2xl font-bold">{video.title}</h1>
            <Video src={video.url} />
            <Buttons
              id={video.id}
              likes={video.likes}
              comments={video.comments}
              db={db}
            />
          </div>
        ))}
      </div>
      )
    </>
  );
};

export const getServerSideProps = async (context) => {
  const db = getFirestore();
  const { id }: { id: string } = context.query;
  const userRef = doc(db, "users", id);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      profile: userDoc.data(),
    },
  };
};

export default User;
