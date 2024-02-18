import { effect, signal } from "@preact/signals-react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../firebase";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const userSig = signal<any>(null);
export const UID = signal<string | null>(auth.currentUser?.uid || null);

effect(() => {
  if (UID.value)
    getDoc(doc(db, "users", UID.value)).then((doc) => {
      if (doc.exists()) {
        userSig.value = doc.data();
      }
    });
  else userSig.value = null;
});
