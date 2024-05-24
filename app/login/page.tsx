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

    if (!uid || !email || !displayName || !photoURL) return;

    const currentData = await getDoc(doc(db, "users", uid));

    const now = Date.now();

    const stubData = {
      favorites: [],
      history: [],
      likes: [],
      uploads: [],
      createdAt: now,
      preferences: {
        language: "any",
        nsfw: false,
      },
    } as {
      favorites: string[];
      history: string[];
      likes: string[];
      uploads: string[];
      createdAt: number;
      preferences: {
        language: "arabic" | "english" | "any";
        nsfw: boolean;
      };
    };

    const data = currentData.exists() ? (currentData.data() as User) : stubData;

    const u: User = {
      ...data,
      email,
      name: displayName,
      image: photoURL,
      uid,
      displayName,
      photoURL,
      updatedAt: now,
    };

    await setDoc(doc(db, "users", uid), u, { merge: true });
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
