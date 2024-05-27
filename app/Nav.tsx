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

const links = [
  { href: "/", name: "Home", icon: <TbBrandGoogleHome /> },
  { href: "/search", name: "Search", icon: <TbSearch /> },
  { href: "/add", name: "", icon: <TbPlus /> },
  { href: "/favorites", name: "Favorites", icon: <TbStar /> },
  { href: "/profile", name: "Profile", icon: <TbUser /> },
];

export default function Nav() {
  const { user } = useUserStore();

  return (
    <nav className="relative z-50 grid h-16 w-full grid-cols-5 grid-rows-1">
      {links.map((link) => (
        <Link
          href={link.href}
          key={link.href}
          className={
            "flex flex-col items-center justify-center gap-1 text-xl" +
            (link.href === "/add"
              ? " ghosting-text h-12 rounded-2xl bg-white bg-opacity-40"
              : "")
          }
        >
          {link.icon}
          <span className="text-xs">{link.name}</span>
        </Link>
      ))}
    </nav>
  );
}
