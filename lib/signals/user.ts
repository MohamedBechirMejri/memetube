import { signal } from "@preact/signals-react";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

export const userSig = signal<any>({});

export const authSig = signal(getAuth());

