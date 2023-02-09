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

import "../styles/globals.scss";
import Nav from "../components/Nav";

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
        <Nav user={user} signIn={signIn} />
        <Component {...pageProps} />
      </div>
    </UserContext.Provider>
  );
};

export default App;
