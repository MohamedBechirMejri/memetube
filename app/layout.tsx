"use client";

import { effect } from "@preact/signals-react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import {
  TbBrandGoogleHome,
  TbPlus,
  TbSearch,
  TbStar,
  TbUser,
} from "react-icons/tb";
import { firebaseConfig } from "~/lib/firebase";
import { UID, useUserStore, userSig } from "~/lib/globals/user";
import "./globals.css";
import { useForceUpdate } from "framer-motion";
import Nav from "./Nav";

const inter = Inter({ subsets: ["latin"] });

// const analytics = getAnalytics(app);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  effect(async () => {
    await auth.authStateReady();
    UID.value = auth.currentUser?.uid || null;
  });

  console.log(userSig.value);

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
          <Nav user={userSig.value} />
        </main>
      </body>
    </html>
  );
}
