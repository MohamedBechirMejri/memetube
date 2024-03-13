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
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { firebaseConfig } from "~/lib/firebase";
import { useUserStore } from "~/lib/globals/user";
import { User } from "~/types/User";

export default function Login() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  const { setUID } = useUserStore();

  useEffect(() => {
    onAuthStateChanged(auth, (u) => setUID(u?.uid || null));
  }, [auth, setUID]);

  const signIn = async () => {
    await setPersistence(auth, browserLocalPersistence);

    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    const userData = result.user;

    const currentData = await getDoc(doc(db, "users", userData.uid));
    let favorites,
      history,
      likes,
      uploads = [];
    let createdAt = Date.now();

    if (currentData.exists()) {
      favorites = currentData.data().favorites;
      history = currentData.data().history;
      likes = currentData.data().likes;
      uploads = currentData.data().uploads;
      createdAt = currentData.data().createdAt;
    }

    await setDoc(
      doc(db, "users", userData.uid),
      {
        email: userData.email,
        name: userData.displayName,
        image: userData.photoURL,
        uid: userData.uid,
        favorites,
        history,
        likes,
        uploads,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        displayName: userData.displayName,
        photoURL: userData.photoURL,
      } as User,
      { merge: true },
    );
  };

  return (
    <main className="flex h-full flex-col items-center justify-center p-4">
      Soon...
      <button onClick={signIn}>login</button>
    </main>
  );
}
