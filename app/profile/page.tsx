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
    <main className="flex h-full flex-col items-center justify-center p-4">
      Soon...
      {user?.name}
    </main>
  );
}
