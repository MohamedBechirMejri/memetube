"use client";

import { initializeApp } from "firebase/app";
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
import { firebaseConfig } from "~/lib/firebase";
import { UID } from "~/lib/globals/user";

export default function Login() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  onAuthStateChanged(auth, (u) => (UID.value = u?.uid || null));

  const signIn = useCallback(async () => {
    await setPersistence(auth, browserLocalPersistence);

    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    const userData = result.user;

    await setDoc(
      doc(db, "users", userData.uid),
      {
        email: userData.email,
        name: userData.displayName,
        image: userData.photoURL,
        uid: userData.uid,
      },
      { merge: true },
    );
  }, [auth, db]);

  return (
    <main className="flex h-full flex-col items-center justify-center p-4">
      Soon...
      <button onClick={signIn}>login</button>
    </main>
  );
}
