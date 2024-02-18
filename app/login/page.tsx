"use client";

import {
  GoogleAuthProvider,
  browserLocalPersistence,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useCallback } from "react";
import {   userSig } from "~/lib/signals/user";

export default function Login() {
  const auth = getAuth();

  setPersistence(auth, browserLocalPersistence);

  onAuthStateChanged(auth, (u) => (userSig.value = u));

  const signIn = useCallback(async () => {
    const db = getFirestore();

    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    const userData = result.user;
    console.log(userData);

    await setDoc(
      doc(db, "users", userData.uid),
      {
        displayName: userData.displayName,
        photoURL: userData.photoURL,
        uid: userData.uid,
      },
      { merge: true },
    );
  }, [auth]);

  return (
    <main className="flex h-full flex-col items-center justify-center p-4">
      Soon...
      <button onClick={signIn}>login</button>
    </main>
  );
}
