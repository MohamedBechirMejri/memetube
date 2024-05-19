"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserStore } from "~/lib/globals/user";

export default function Profile() {
  const { user } = useUserStore();

  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [router, user]);

  return (
    <main className="flex h-full flex-col items-center justify-between p-4 pb-8">
      <h1 className="self-start text-2xl font-semibold">
        Hello, {user?.name.split(" ")[0]}
      </h1>

      <button className="rounded-2xl bg-rose-500 bg-opacity-15 p-2 px-8 text-rose-500">
        Logout
      </button>
    </main>
  );
}
