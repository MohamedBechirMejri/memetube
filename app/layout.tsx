import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { TbBrandGoogleHome, TbPlus, TbSearch, TbStar, TbUser } from "react-icons/tb";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          inter.className +
          " flex h-[100svh] w-[100svw] flex-col items-center justify-between bg-slate-950 text-white"
        }
      >
        <main className="grid h-[100svh] w-full max-w-[38rem] grid-rows-[minmax(0,1fr),auto] bg-black">
          {children}
          <nav className="relative z-50 grid h-20 w-full grid-cols-5 place-items-center">
            <Link href={"/"} className="flex flex-col items-center ">
              <TbBrandGoogleHome />
              Home
            </Link>
            <Link href={"/search"} className="flex flex-col items-center ">
              <TbSearch />
              Search
            </Link>
            <Link
              href="/add"
              className="-mt-2 flex flex-col items-center rounded-full bg-white p-2 px-6 text-black"
            >
              <TbPlus className="text-3xl" />
            </Link>
            <Link href="/favorites" className="flex flex-col items-center ">
              <TbStar />
              Favorites
            </Link>
            <Link href={"/profile"} className="flex flex-col items-center ">
              <TbUser />
              Search
            </Link>
          </nav>
        </main>
      </body>
    </html>
  );
}
