"use client";

import { userSig } from "~/lib/signals/user";

export default function Profile() {
  console.log(userSig.value);

  return (
    <main className="flex h-full flex-col items-center justify-center p-4">
      Soon...
    </main>
  );
}
