"use client";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Inter } from "next/font/google";
import { firebaseConfig } from "~/lib/firebase";
import { UID, userSig } from "~/lib/globals/user";
import Nav from "./Nav";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// const analytics = getAnalytics(app);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  onAuthStateChanged(auth, (u) => {
    UID.value = u?.uid || null;
  });
  auth.authStateReady().then(() => {
    console.log(auth.currentUser);
    UID.value = auth.currentUser?.uid || null;
  });

  console.log(userSig.value);
  console.log(UID.value ?? " ");

  return (
    <html lang="en">
      <body
        className={
          inter.className +
          " flex h-[100svh] w-[100svw] flex-col items-center justify-between bg-slate-950 text-white"
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
