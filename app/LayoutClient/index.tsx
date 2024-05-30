"use client";

import { usePathname } from "next/navigation";
import { useUserStore } from "~/lib/globals/user";
import Nav from "../Nav";
import AuthLoader from "./AuthLoader";
import VideosLoader from "./VideosLoader";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useUserStore();

  const pathname = usePathname();

  let page;

  switch (pathname) {
    case "/add":
      page = "New Meme";
      break;
    case "/search":
      page = "Search Memes";
      break;
    case "/profile":
      page = user ? "Hello, " + user.name.split(" ")[0] : "Profile";
      break;
    default:
      page = "MemeStash";
  }

  if (pathname.includes("/search/c/")) page = "";

  return (
    <div className="relative grid h-[100svh] w-full max-w-[38rem] grid-rows-[minmax(0,1fr),auto]">
      <h1 className="ghosting-text absolute z-50 w-full py-4 text-center text-2xl font-bold">
        {page}
      </h1>
      {children}
      <Nav />

      <AuthLoader />
      <VideosLoader />
    </div>
  );
}
