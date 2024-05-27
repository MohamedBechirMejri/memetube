"use client";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Inter } from "next/font/google";
import { firebaseConfig } from "~/lib/firebase";
import Nav from "./Nav";
import "./globals.scss";
import { useUserStore } from "~/lib/globals/user";
import { useEffect } from "react";
import { collection, doc, getFirestore, onSnapshot } from "firebase/firestore";
import { usePathname } from "next/navigation";
import { Video } from "~/types/Video";
import { useVideoStore } from "~/lib/globals/video";

const inter = Inter({ subsets: ["latin"] });

// const analytics = getAnalytics(app);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

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
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MemeStash</title>
        <meta
          name="description"
          content="Collection of the best memes around the web"
        />
      </head>
      <body
        className={
          inter.className +
          " flex h-[100svh] w-[100svw] flex-col items-center justify-between bg-slate-950 text-white antialiased"
        }
      >
        <div className="relative grid h-[100svh] w-full max-w-[38rem] grid-rows-[minmax(0,1fr),auto]">
          <h1 className="ghosting-text absolute z-50 w-full py-4 text-center text-2xl font-bold">
            {page}
          </h1>
          {children}
          <Nav />
        </div>
      </body>
    </html>
  );
}
