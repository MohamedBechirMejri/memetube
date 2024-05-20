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
import { useRouter } from "next/navigation";

export default function Login() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const router = useRouter();

  const { setUID, uid } = useUserStore();

  const signIn = async () => {
    await setPersistence(auth, browserLocalPersistence);

    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    const { email, displayName, photoURL, uid } = result.user;

    const currentData = await getDoc(doc(db, "users", uid));
    let favorites,
      history,
      likes,
      uploads = [];
    let createdAt,
      updatedAt = Date.now();

    if (currentData.exists()) {
      const data = currentData.data();

      favorites = data.favorites || [];
      history = data.history || [];
      likes = data.likes || [];
      uploads = data.uploads || [];
      createdAt = data.createdAt || updatedAt;
    }

    await setDoc(
      doc(db, "users", uid),
      {
        email,
        name: displayName,
        image: photoURL,
        uid,
        favorites,
        history,
        likes,
        uploads,
        createdAt,
        updatedAt,
        displayName,
        photoURL,
      } as User,
      { merge: true },
    );
  };

  useEffect(() => {
    onAuthStateChanged(auth, (u) => setUID(u?.uid || null));
  }, [auth, setUID]);

  useEffect(() => {
    if (uid) router.back();
  }, [router, uid]);

  return (
    <main className="flex h-full flex-col items-center justify-center p-4">
      <h1 className="text-xl font-bold text-rose-500">Login to continue</h1>

      <button onClick={signIn} className="mt-4 rounded border p-2 px-8">
        Sign in with Google
      </button>
    </main>
  );
}
