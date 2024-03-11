"use client";

import Link from "next/link";
import {
  TbBrandGoogleHome,
  TbSearch,
  TbPlus,
  TbStar,
  TbUser,
} from "react-icons/tb";
import Image from "next/image";
import { useUserStore } from "~/lib/globals/user";

export default function Nav() {
  const { user } = useUserStore();
  
  return (
    <nav className="relative z-50 grid h-16 w-full grid-cols-5 grid-rows-1 place-items-center ">
      <Link href={"/"} className="flex flex-col items-center justify-between ">
        <TbBrandGoogleHome />
        Home
      </Link>
      <Link
        href={"/search"}
        className="flex flex-col items-center justify-between gap-1 "
      >
        <TbSearch />
        Search
      </Link>
      <Link
        href="/add"
        className="-mt-2 flex flex-col items-center rounded-full bg-white p-2 px-6 text-black"
      >
        <TbPlus className="text-3xl" />
      </Link>
      <Link
        href="/favorites"
        className="flex flex-col items-center justify-between "
      >
        <TbStar />
        Favorites
      </Link>
      <Link
        href={"/profile"}
        className="flex flex-col items-center justify-between "
      >
        {user ? (
          <Image
            src={user.image}
            width={48}
            height={48}
            alt="user"
            className="h-6 w-6 rounded-full"
          />
        ) : (
          <TbUser />
        )}
        Profile
      </Link>
    </nav>
  );
}
