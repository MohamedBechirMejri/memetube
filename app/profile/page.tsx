"use client";

import { useUserStore } from "~/lib/globals/user";

export default function Profile() {
  const { user } = useUserStore();

  return (
    <main className="flex h-full flex-col items-center justify-center p-4">
      Soon...
      {!!user && user.name}
    </main>
  );
}
