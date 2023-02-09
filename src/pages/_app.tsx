/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { type AppType } from "next/dist/shared/lib/utils";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { useCallback, useState } from "react";

import UserContext from "../../lib/UserContext";

import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";

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

  const db = getFirestore();
  const auth = getAuth();
  onAuthStateChanged(auth, (usr) => setUser(usr));

  const signIn = useCallback((): void => {
    void signInWithPopup(auth, new GoogleAuthProvider()).then((result) => {
      const userdata = result.user;

      void setDoc(
        doc(db, "users", userdata.uid),
        {
          displayName: userdata.displayName,
          photoURL: userdata.photoURL,
          subscribers: [],
          uid: userdata.uid,
        },
        { merge: true }
      );
    });
  }, [auth, db]);

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
            <button
              className="grid h-10 w-10 place-items-center rounded-full border border-current text-3xl text-fuchsia-500"
              onClick={signIn}
            >
              <AiOutlineUser />
            </button>
          )}
        </nav>
        <Component {...pageProps} />
      </div>
    </UserContext.Provider>
  );
};

export default App;
