"use client";

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { firebaseConfig } from "~/lib/firebase";
import { userSig } from "~/lib/signals/user";

export default function Profile() {
  // const app = initializeApp(firebaseConfig);
  // console.log(getAuth(app));
  console.log(userSig.value);

  return (
    <main className="flex h-full flex-col items-center justify-center p-4">
      Soon...
    </main>
  );
}
