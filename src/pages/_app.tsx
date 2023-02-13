/* eslint-disable @typescript-eslint/ban-ts-comment */
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
import { doc, getFirestore, onSnapshot, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { useCallback, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

import UserContext from "../../lib/UserContext";

import "../styles/globals.scss";
import Nav from "../components/Nav";
import Head from "next/head";

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
  const [profile, setProfile] = useState(null as object | null);
  const [db] = useState(getFirestore());
  const [auth] = useState(getAuth());

  onAuthStateChanged(auth, (usr) => setUser(usr));

  const signIn = useCallback((): void => {
    void signInWithPopup(auth, new GoogleAuthProvider()).then((result) => {
      const userdata = result.user;

      void setDoc(
        doc(db, "users", userdata.uid),
        {
          displayName: userdata.displayName,
          photoURL: userdata.photoURL,
          uid: userdata.uid,
        },
        { merge: true }
      );
    });
  }, [auth, db]);

  const signOut = useCallback((): void => {
    void auth.signOut();
  }, [auth]);

  useEffect(() => {
    if (!user) return;
    // @ts-ignore
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
      setProfile(doc.data());
    });
    return unsub;
  }, [db, user]);

  return (
    <UserContext.Provider value={[profile, setProfile]}>
      <Head>
        <meta name="application-name" content="MemeTube" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="MemeTube" />
        <meta name="description" content="Best PWA App in the world" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/icons/favicon.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="MemeTube" />
        <meta name="twitter:creator" content="@MohamedBechirMe" />
        <meta property="og:image" content="/favicon.png" />
        <link
          rel="apple-touch-startup-image"
          href="/favicon.png"
          sizes="2048x2732"
        />
      </Head>
      <div className="relative m-auto h-[100svh] w-[100svw] max-w-3xl overflow-hidden font-[Nunito] font-bold">
        <Nav user={profile} signIn={signIn} signOut={signOut} />
        <Component {...pageProps} user={profile} />
        <Toaster position="top-left" />
      </div>
    </UserContext.Provider>
  );
};

export default App;
