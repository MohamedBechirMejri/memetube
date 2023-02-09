/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { type AppType } from "next/dist/shared/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
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

  console.log(user);

  return (
    <UserContext.Provider value={user}>
      <div className="relative m-auto h-[100svh] w-[100svw] max-w-3xl overflow-hidden font-bold">
        <nav className="absolute z-50 flex h-[5rem] w-full items-center justify-between px-8 text-xl">
          <Link href="/">
            <h1 className="text-center text-[#000] [text-shadow:3px_-2px_0_#fb00ff]">
              Meme Archive
            </h1>
          </Link>
          {user ? (
            <div>user</div>
          ) : (
            <Link
              href="/login"
              className="grid h-10 w-10 place-items-center rounded-full border border-current text-3xl text-fuchsia-500"
            >
              <AiOutlineUser />
            </Link>
          )}
        </nav>
        <Component {...pageProps} />
      </div>
    </UserContext.Provider>
  );
};

export default App;
