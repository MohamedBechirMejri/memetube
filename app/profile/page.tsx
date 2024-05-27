"use client";

import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { firebaseConfig } from "~/lib/firebase";
import { useUserStore } from "~/lib/globals/user";
import Settings from "./Settings";
import Uploads from "./Uploads";
import Likes from "./Likes";
import History from "./History";
import { TbX } from "react-icons/tb";

const tabs = [
  { name: "uploads", icon: "📤", component: Uploads },
  { name: "likes", icon: "👍", component: Likes },
  { name: "history", icon: "🕒", component: History },
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
    <main
      className="flex h-full flex-col items-center justify-between p-4 pb-8 pt-16"
      style={{ opacity: user ? 1 : 0 }}
    >
      {Tab && (
        <div className="center fixed z-50 h-full w-full max-w-[38rem] bg-black bg-opacity-40 backdrop-blur-3xl">
          <button
            className="absolute left-4 top-4 z-50 text-3xl text-white"
            onClick={close}
          >
            <TbX />
          </button>
          <Tab close={close} />
        </div>
      )}

      <div className="w-full pt-4">
        <div className="flex w-max items-center justify-between gap-4 text-lg font-bold">
          {user && (
            <Image
              src={user?.image}
              alt={user?.name}
              width={100}
              height={100}
              className="rounded-full"
            />
          )}

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
              className={`mx-auto flex w-full cursor-pointer select-none items-center justify-between gap-4 rounded-2xl bg-slate-500 bg-opacity-10 p-4  px-8 text-lg font-bold capitalize text-slate-200 transition-all duration-300 hover:bg-opacity-20`}
              onClick={() => setTab(tab.name)}
            >
              <span>{tab.name}</span>
              <span className="grayscale">{tab.icon}</span>
            </li>
          ))}
          <button
            className="select-none rounded-2xl border-rose-500 bg-rose-500 bg-opacity-15 p-4 px-8 font-bold text-rose-500 opacity-90 transition-all hover:bg-opacity-20 hover:text-rose-600"
            onClick={() => signOut(auth)}
          >
            Logout 👋
          </button>
        </ul>
      </div>

      <p className="flex flex-col items-center">
        <span className="text-sm opacity-80">© 2024</span>
        <span className="text-sm opacity-80">Made with ❤️ by</span>{" "}
        <a
          href="https://twitter.com/0x4D424D"
          target="_blank"
          rel="noreferrer"
          className="text-rose-500"
        >
          @0x4D424D
        </a>
      </p>
    </main>
  );
}
