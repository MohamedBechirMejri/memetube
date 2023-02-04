import { type AppType } from "next/dist/shared/lib/utils";
import Link from "next/link";
import { GrAdd, GrChat, GrHomeOption, GrSearch } from "react-icons/gr";

import "../styles/globals.scss";

const App: AppType = ({ Component, pageProps }) => {
  return (
    <div className="m-auto grid h-[100svh] w-screen grid-rows-[1fr,auto] overflow-hidden bg-gray-800">
      <Component {...pageProps} />
      <nav className="grid h-[5rem] grid-cols-5 place-items-center rounded-t-xl bg-blue-50 text-xl elevation-12">
        <Link href="/">
          <GrHomeOption />
        </Link>
        <Link href="/search">
          <GrSearch />
        </Link>
        <Link
          href="/upload"
          className="-mt-16 grid h-16 w-16 place-items-center rounded-full bg-blue-300 elevation-5"
        >
          <GrAdd />
        </Link>
        <Link href="/chat">
          <GrChat />
        </Link>
        <Link href="/@me">
          <div className="h-6 w-6 rounded-full bg-black"></div>
        </Link>
      </nav>
    </div>
  );
};

export default App;
