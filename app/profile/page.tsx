"use client";

import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { firebaseConfig } from "~/lib/firebase";
import { useUserStore } from "~/lib/globals/user";
import Settings from "./Settings";

const tabs = [
  { name: "uploads", icon: "📤", component: Settings },
  { name: "likes", icon: "👍", component: Settings },
  { name: "history", icon: "🕒", component: Settings },
  { name: "settings", icon: "⚙️", component: Settings },
];

export default function Profile() {
  const [tab, setTab] = useState("r");

  const { user } = useUserStore();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const router = useRouter();

  const close = () => setTab("");

  const Tab = tabs.find((t) => t.name === tab)?.component;

  useEffect(() => {
    if (!user) router.push("/login");
  }, [router, user]);

  return (
    <main className="flex h-full flex-col items-center justify-between p-4 pb-8 pt-16">
      {Tab && (
        <div className="center fixed z-[80] h-full w-full bg-black bg-opacity-40 backdrop-blur-3xl">
          <Tab close={close} />
        </div>
      )}

      <div className="w-full pt-4">
        <div className="flex w-max items-center justify-between gap-4 text-lg font-bold">
          <Image
            src={user?.image || ""}
            alt={user?.name || ""}
            width={100}
            height={100}
            className="rounded-full"
          />

          <div>
            <p>{user?.name}</p>
            <p className="flex gap-2 opacity-70">
              <span className="text-sm font-light">
                Uploads: {user?.uploads.length}
              </span>
              <span className="text-sm font-light">
                likes: {user?.likes.length}
              </span>
              <span className="text-sm font-light">
                History: {user?.history.length}
              </span>
            </p>
          </div>
        </div>

        <ul className="flex flex-col gap-4 pt-12">
          {tabs.map((tab, i) => (
            <li
              key={tab.name}
              className={`mx-auto flex w-full cursor-pointer select-none items-center justify-between gap-4 rounded-2xl border border-blue-500 bg-blue-500 bg-opacity-10 p-4 text-lg font-bold capitalize text-yellow-500 transition-all hover:bg-opacity-20`}
              onClick={() => setTab(tab.name)}
            >
              <span>{tab.name}</span>
              <span>→</span>
            </li>
          ))}
          <button
            className="select-none rounded-2xl border border-rose-500 bg-rose-500 bg-opacity-15 p-4 px-8 font-bold text-rose-500 transition-all hover:bg-opacity-20 hover:text-rose-600"
            onClick={() => signOut(auth)}
          >
            Logout
          </button>
        </ul>
      </div>
    </main>
  );
}
