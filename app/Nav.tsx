"use client";

import {
  TbBrandGoogleHome,
  TbSearch,
  TbPlus,
  TbStar,
  TbUser,
} from "react-icons/tb";
import Image from "next/image";
import { useUserStore } from "~/lib/globals/user";
import { usePathname } from "next/navigation";
import L from "next/link";
import { motion } from "framer-motion";

const Link = motion(L);

const links = [
  { href: "/", name: "Home", icon: <TbBrandGoogleHome /> },
  { href: "/search", name: "Search", icon: <TbSearch /> },
  { href: "/add", name: "", icon: <TbPlus /> },
  { href: "/favorites", name: "Favorites", icon: <TbStar /> },
  { href: "/profile", name: "Profile", icon: <TbUser /> },
];

export default function Nav() {
  const { user } = useUserStore();

  const pathname = usePathname();

  return (
    <nav className="relative z-50 grid h-16 w-full grid-cols-5 grid-rows-1">
      {links.map((link) => (
        <Link
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1 }}
          href={link.href}
          key={link.href}
          className={
            "flex flex-col items-center justify-center gap-1 " +
            (link.href === "/add"
              ? " ghosting-text-alt h-12 rounded-2xl bg-white bg-opacity-50 text-3xl text-black"
              : pathname === link.href
                ? "text-xl text-rose-500"
                : "text-xl text-gray-300")
          }
        >
          {user && link.href === "/profile" ? (
            <Image
              src={user.image}
              alt={user.name}
              width={48}
              height={48}
              className="h-6 w-6 rounded-full"
            />
          ) : (
            link.icon
          )}
          <span className="text-xs">{link.name}</span>
        </Link>
      ))}
    </nav>
  );
}
