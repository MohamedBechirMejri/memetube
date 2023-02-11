/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import Link from "next/link";
import Image from "next/image";
import { AiOutlineUser } from "react-icons/ai";

const Nav = ({ user, signIn }: { user: any; signIn: any }) => {
  return (
    <nav className="absolute z-50 flex h-[5rem] w-full items-center justify-between px-8 text-xl">
      <Link href="/">
        <h1 className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text font-extrabold uppercase text-transparent">
          memetube
        </h1>
      </Link>

      <div className="grid w-max grid-cols-[auto,auto] place-items-center gap-4">
        <Link href="/upload">
          <button className="bg-gradient-to-r from-blue-400 to-teal-600 bg-clip-text font-extrabold text-transparent">
            Upload
          </button>
        </Link>
        {user ? (
          <Link href={`/me`}>
            <Image
              width={44}
              height={44}
              alt="user"
              className="relative z-10 h-11 w-11 rounded-full text-3xl transition-all hover:elevation-2"
              // @ts-ignore
              src={user.photoURL}
              draggable={false}
            />
          </Link>
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
  );
};

export default Nav;
