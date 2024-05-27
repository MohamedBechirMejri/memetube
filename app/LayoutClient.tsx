"use client";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseConfig } from "~/lib/firebase";
import Nav from "./Nav";
import { useUserStore } from "~/lib/globals/user";
import { useEffect } from "react";
import { collection, doc, getFirestore, onSnapshot } from "firebase/firestore";
import { usePathname } from "next/navigation";
import { Video } from "~/types/Video";
import { useVideoStore } from "~/lib/globals/video";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  // const analytics = getAnalytics(app);

  const { setUID, setUser, uid, user } = useUserStore();
  const { setCollection } = useVideoStore();

  const pathname = usePathname();

  let page;

  switch (pathname) {
    case "/add":
      page = "New Meme";
      break;
    case "/search":
      page = "Search Memes";
      break;
    case "/profile":
      page = user ? "Hello, " + user.name.split(" ")[0] : "Profile";
      break;
    default:
      page = "MemeStash";
  }

  useEffect(() => {
    onAuthStateChanged(auth, (u) => setUID(u?.uid || null));

    auth.authStateReady().then(() => setUID(auth.currentUser?.uid || null));
  }, [auth, setUID]);

  useEffect(() => {
    if (uid)
      onSnapshot(doc(db, "users", uid), (doc) => {
        if (doc.exists()) setUser(doc.data());
        else {
          setUser(null);
          signOut(auth);
        }
      });
    else setUser(null);
  }, [auth, db, setUser, uid]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "videos"),
      (snapshot) => {
        const videos = snapshot.docs.map((doc) => doc.data()) as Video[];
        setCollection(videos);
      },
      (error) => console.error(error),
    );

    return () => unsubscribe();
  }, [db, setCollection]);

  return (
    <div className="relative grid h-[100svh] w-full max-w-[38rem] grid-rows-[minmax(0,1fr),auto]">
      <h1 className="ghosting-text absolute z-50 w-full py-4 text-center text-2xl font-bold">
        {page}
      </h1>
      {children}
      <Nav />
    </div>
  );
}
