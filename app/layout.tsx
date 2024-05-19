"use client";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Inter } from "next/font/google";
import { firebaseConfig } from "~/lib/firebase";
import Nav from "./Nav";
import "./globals.css";
import { useUserStore } from "~/lib/globals/user";
import { useEffect } from "react";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";

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

  useEffect(() => {
    onAuthStateChanged(auth, (u) => setUID(u?.uid || null));

    auth.authStateReady().then(() => setUID(auth.currentUser?.uid || null));
  }, [auth, setUID]);

  useEffect(() => {
    if (uid)
      onSnapshot(doc(db, "users", uid), (doc) => {
        if (doc.exists()) setUser(doc.data());
        else setUser(null);
      });
    else setUser(null);
  }, [db, setUser, uid]);

  return (
    <html lang="en">
      <body
        className={
          inter.className +
          " flex h-[100svh] w-[100svw] flex-col items-center justify-between bg-slate-950 text-white antialiased"
        }
      >
        <main className="relative grid h-[100svh] w-full max-w-[38rem] grid-rows-[minmax(0,1fr),auto] bg-black">
          <h1 className="ghosting-text absolute left-4 top-4 text-2xl font-bold">
            MemeTube
          </h1>

          {children}
          <Nav />
        </main>
      </body>
    </html>
  );
}
