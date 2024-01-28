/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { doc, getDoc, getFirestore, onSnapshot } from "firebase/firestore";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Buttons from "../../components/Buttons";
import { default as V } from "../../components/Video";

const Video = ({ id, notFound }: { id: string; notFound: boolean }) => {
  const [db] = useState(getFirestore());
  const [video, setVideo] = useState(null as any);

  useEffect(() => {
    if (notFound) return;
    const unsubscribe = onSnapshot(doc(db, "videos", id), (snapshot) => {
      setVideo(snapshot.data());
    });
    return () => unsubscribe();
  }, [db, id, notFound]);

  return (
    <>
      <Head>
        <title> MemeTube</title>
        <meta name="description" content="Top memes around the web" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      {notFound ? (
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <h1 className="text-2xl">Video not found :(</h1>
          <Link
            href="/"
            className="rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 p-4 font-extrabold text-white transition-all elevation-4 hover:underline"
          >
            Go Home
          </Link>
        </div>
      ) : !video ? (
        <div className="flex h-full items-center justify-center">loading..</div>
      ) : (
        <div
          key={video.id}
          className="grid h-[calc(100svh)] w-full grid-rows-[auto,1fr,auto] overflow-hidden bg-white p-4 py-14"
        >
          <div className="p-4 capitalize">
            <h1 className="text-2xl font-bold">{video.title}</h1>
            <Link
              href={`/u/${video.uploader.id}`}
              className="text-sm contrast-[.25] hover:underline"
            >
              {video.uploader.displayName}
            </Link>
          </div>
          <V src={video.url} />
          <Buttons
            id={video.id}
            likes={video.likes}
            comments={video.comments}
            db={db}
          />
        </div>
      )}
    </>
  );
};

export const getServerSideProps = async (context) => {
  const db = getFirestore();
  const { id }: { id: string } = context.query;
  const videoRef = doc(db, "videos", id);
  const videoDoc = await getDoc(videoRef);

  if (!videoDoc.exists()) {
    return {
      props: { notFound: true },
    };
  }

  return {
    props: { id },
  };
};

export default Video;
