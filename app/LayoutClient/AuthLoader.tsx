import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { firebaseConfig } from "~/lib/firebase";
import { useUserStore } from "~/lib/globals/user";

export default function AuthLoader() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  const { setUID, setUser, uid } = useUserStore();

  useEffect(() => {
    onAuthStateChanged(auth, (u) => setUID(u?.uid || null));

    auth.authStateReady().then(() => setUID(auth.currentUser?.uid || null));
  }, [auth, setUID]);

  useEffect(() => {
    if (uid)
      onSnapshot(doc(db, "users", uid), (doc) => {
        if (doc.exists()) setUser(doc.data());
        else {
          setUser(null);
          signOut(auth);
        }
      });
    else setUser(null);
  }, [auth, db, setUser, uid]);

  return null;
}
