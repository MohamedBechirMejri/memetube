/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import Link from "next/link";
import Image from "next/image";
import { AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Upload from "./Upload";

const Nav = ({ user, signIn }: { user: any; signIn: any }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isUploadOpen && <Upload setIsUploadOpen={setIsUploadOpen} />}
      </AnimatePresence>
      <nav className="absolute z-50 flex h-[5rem] w-full items-center justify-between px-8 text-xl">
        <Link href="/">
          <h1 className="group bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text font-extrabold uppercase text-transparent">
            memetube
            <div className="h-[3px] w-full rounded-2xl bg-gradient-to-r from-purple-400 to-pink-600 opacity-0 transition-all group-hover:opacity-100" />
          </h1>
        </Link>

        <div className="grid w-max grid-cols-[auto,auto] place-items-center gap-4">
          <button
            className="group bg-gradient-to-r from-blue-400 to-teal-600 bg-clip-text font-extrabold text-transparent"
            onClick={() => setIsUploadOpen(true)}
          >
            Upload
            <div className="h-[3px] w-full rounded-2xl bg-gradient-to-r from-blue-400 to-teal-600 opacity-0 transition-all group-hover:opacity-100" />
          </button>

          {user ? (
            <div className="relative">
              <Image
                width={44}
                height={44}
                alt="user"
                className="relative z-10 h-11 w-11 cursor-pointer rounded-full text-3xl transition-all active:brightness-75"
                // @ts-ignore
                src={user.photoURL}
                draggable={false}
                onClick={() => setIsMenuOpen((prev) => !prev)}
              />
              <AnimatePresence>
                {isMenuOpen && (
                  <>
                    <motion.ul
                      initial={{ opacity: 0, width: "0rem" }}
                      animate={{ opacity: 1, width: "12rem" }}
                      exit={{ opacity: 0, width: "0rem" }}
                      transition={{
                        type: "spring",
                        damping: 10,
                        stiffness: 100,
                      }}
                      className="absolute right-0 top-[125%] z-50 grid origin-right grid-cols-3 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-gray-500 to-slate-900 text-white elevation-4"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link
                        href={`/u/${user.uid}`}
                        className="p-4 transition-all hover:text-green-500"
                      >
                        <AiOutlineUser />
                      </Link>

                      <Link
                        href="/saved"
                        className="p-4 transition-all hover:text-blue-500"
                      >
                        <FaRegBookmark />
                      </Link>

                      <button className="p-4 transition-all hover:text-red-500">
                        <AiOutlineLogout />
                      </button>
                    </motion.ul>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        type: "spring",
                        damping: 10,
                        stiffness: 100,
                      }}
                      className="fixed left-0 top-0 h-screen w-screen bg-[#00000054]"
                      onClick={() => setIsMenuOpen(false)}
                    />
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              className="grid h-10 w-10 place-items-center rounded-full border border-current text-3xl text-fuchsia-500"
              onClick={signIn}
            >
              <AiOutlineUser />
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

export default Nav;
