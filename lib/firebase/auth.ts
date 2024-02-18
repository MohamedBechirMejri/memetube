import { doc, getFirestore, setDoc } from "firebase/firestore";
import { authSig, userSig } from "../signals/user";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";

const auth = authSig.value;

onAuthStateChanged(auth, (u) => (userSig.value = u));

export const signIn = async () => {
  const db = getFirestore();

  const result = await signInWithPopup(auth, new GoogleAuthProvider());
  const userData = result.user;

  await setDoc(
    doc(db, "users", userData.uid),
    {
      displayName: userData.displayName,
      photoURL: userData.photoURL,
      uid: userData.uid,
    },
    { merge: true },
  );
};

export const signOut = () => auth.signOut();
