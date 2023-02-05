/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { type AppType } from "next/dist/shared/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { GrAdd, GrChat, GrHomeOption, GrSearch } from "react-icons/gr";
import UserContext from "../../lib/UserContext";

import "../styles/globals.scss";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "beautube-fc973.firebaseapp.com",
  projectId: "beautube-fc973",
  storageBucket: "beautube-fc973.appspot.com",
  messagingSenderId: "716036336224",
  appId: "1:716036336224:web:4d4cca77dd6f9adb003105",
};

initializeApp(firebaseConfig);
getStorage();

const App: AppType = ({ Component, pageProps }) => {
  const [user, setUser] = useState(null as object | null);
  const auth = getAuth();
  onAuthStateChanged(auth, (usr) => setUser(usr));

  console.log(user)

  return (
    <UserContext.Provider value={user}>
      <div className="m-auto grid h-[100svh] w-screen grid-rows-[1fr,auto] overflow-hidden bg-slate-900 font-bold ">
        <Component {...pageProps} />
        <nav className="z-10 grid h-[5rem] grid-cols-5 place-items-center rounded-t-xl bg-blue-50 text-xl elevation-12">
          <Link href="/">
            <GrHomeOption />
          </Link>
          <Link href="/search">
            <GrSearch />
          </Link>
          <Link
            href="/upload"
            className="-mt-16 grid h-16 w-16 place-items-center rounded-full bg-blue-300 elevation-5"
          >
            <GrAdd />
          </Link>
          <Link href="/chat">
            <GrChat />
          </Link>
          <Link href="/@me">
            <div className="h-6 w-6 rounded-full bg-black"></div>
          </Link>
        </nav>
      </div>
    </UserContext.Provider>
  );
};

export default App;
