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
        <h1 className="text-center text-[#000] [text-shadow:3px_-2px_0_#fb00ff]">
          Meme Archive
        </h1>
      </Link>
      {user ? (
        <Link href={`/me`}>
          <Image
            width={44}
            height={44}
            alt="user"
            className="relative top-0 right-0 z-10 grid h-11 w-11 place-items-center rounded-full text-3xl transition-all hover:elevation-2"
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
    </nav>
  );
};

export default Nav;
