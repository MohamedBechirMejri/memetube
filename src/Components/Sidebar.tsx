/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import { NavLink } from "react-router-dom";
import {
  MdExpandLess,
  MdExpandMore,
  MdOndemandVideo,
  // MdOutlineExplore,
  MdOutlineHistory,
  MdOutlineSubscriptions,
  // MdOutlineVideoLibrary,
  MdOutlineWatchLater,
} from "react-icons/md";
import { RiHeart2Line, RiSettings3Line } from "react-icons/ri";
import { BsPatchExclamation } from "react-icons/bs";
import { TiHomeOutline } from "react-icons/ti";
import { getAuth } from "firebase/auth";

function Sidebar({ isSidebarOpen }: { isSidebarOpen: boolean }): JSX.Element {
  return (
    <nav
      className={`flex flex-col items-start justify-start h-[92vh] overflow-y-scroll overflow-x-hidden transition-all shrink-0 ${
        isSidebarOpen ? "animate-revealSidebar" : "animate-hideSidebar"
      } noscroll border-r-[.1px] border-[#2c323a] `}
    >
      <div className="flex flex-col w-full">
        <NavLink
          to="/"
          className="flex items-center justify-start w-full gap-2 p-4 px-4 transition-all hover:bg-gray-600 hover:text-white"
        >
          <span>
            <TiHomeOutline />
          </span>{" "}
          Home
        </NavLink>
        {/* <NavLink
          to="/"
          className="flex items-center justify-start w-full gap-2 p-4 px-4 transition-all hover:bg-gray-600 hover:text-white"
        >
          <span>
            <MdOutlineExplore />
          </span>{" "}
          Explore
        </NavLink> */}
        {/* <NavLink
          to="/"
          className="flex items-center justify-start w-full gap-2 p-4 px-4 transition-all hover:bg-gray-600 hover:text-white"
        >
          <span>
            <MdOutlineSubscriptions />
          </span>{" "}
          Subscriptions
        </NavLink> */}
      </div>
      <hr />
      <div className="flex flex-col w-full">
        {" "}
        {/* <NavLink
          to="/"
          className="flex items-center justify-start w-full gap-2 p-4 px-4 transition-all hover:bg-gray-600 hover:text-white"
        >
          <span>
            <MdOutlineVideoLibrary />
          </span>{" "}
          Library
        </NavLink> */}
        {/* <NavLink
          to="/"
          className="flex items-center justify-start w-full gap-2 p-4 px-4 transition-all hover:bg-gray-600 hover:text-white"
        >
          <span>
            <MdOutlineHistory />
          </span>{" "}
          History
        </NavLink> */}
        {getAuth().currentUser && (
          <NavLink
            to={`/user/${getAuth().currentUser!.uid}`}
            className="flex items-center justify-start w-full gap-2 p-4 px-4 transition-all hover:bg-gray-600 hover:text-white"
          >
            <span>
              <MdOndemandVideo />
            </span>{" "}
            Your Videos
          </NavLink>
        )}
        {/* <NavLink
          to="/"
          className="flex items-center justify-start w-full gap-2 p-4 px-4 transition-all hover:bg-gray-600 hover:text-white"
        >
          <span>
            <MdOutlineWatchLater />
          </span>{" "}
          Watch later
        </NavLink> */}
        {/* <NavLink
          to="/"
          className="flex items-center justify-start w-full gap-2 p-4 px-4 transition-all hover:bg-gray-600 hover:text-white"
        >
          <span>
            <RiHeart2Line />
          </span>{" "}
          Liked videos
        </NavLink> */}
        <div>{/* playlists map shown if show more == true */}</div>
        {/* <div className="flex items-center justify-start w-full gap-2 p-4 px-4 transition-all hover:bg-gray-600 hover:text-white">
          <span>
            <MdExpandMore />
          </span>{" "}
          show more
        </div> */}
      </div>
      <hr />
      {/* <div className="w-full">
        <h2 className="px-4 pt-2 font-semibold">Subscriptions</h2>
        <div>
          // filter of top 7 subs else if show more then map of subs
        </div>
        <div className="flex items-center justify-start w-full gap-2 p-4 px-4 transition-all hover:bg-gray-600 hover:text-white">
          <span>
            {" "}
            <MdExpandLess />
          </span>{" "}
          show less
        </div>
      </div> */}
      <hr />
      <div className="w-full">
        {/* <NavLink
          to="settings"
          className="flex items-center justify-start w-full gap-2 p-4 px-4 transition-all hover:bg-gray-600 hover:text-white"
        >
          <span>
            <RiSettings3Line />
          </span>{" "}
          Settings
        </NavLink>{" "} */}
        <a
          href="https://github.com/MohamedBechirMejri/beautube/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-start w-full gap-2 p-4 px-4 transition-all hover:bg-gray-600 hover:text-white"
        >
          <span>
            <BsPatchExclamation />
          </span>{" "}
          Send Feedback
        </a>
      </div>
      <hr />
      <footer className="max-w-[15em] flex flex-col items-start justify-center gap-2 p-4 text-sm text-gray-200">
        {/* <div className="flex flex-wrap items-center justify-start gap-1 ">
          <a href="https://.com" className="hover:underline">
            About
          </a>
          <a href="https://.com" className="hover:underline">
            Press
          </a>
          <a href="https://.com" className="hover:underline">
            Copyright
          </a>
          <a href="https://.com" className="hover:underline">
            Contact us
          </a>
          <a href="https://.com" className="hover:underline">
            Creators
          </a>
          <a href="https://.com" className="hover:underline">
            Advertise
          </a>
          <a href="https://.com" className="hover:underline">
            Developers
          </a>
        </div>{" "}
        <div className="flex flex-wrap items-center justify-start gap-1 ">
          <a href="https://.com" className="hover:underline">
            Terms
          </a>
          <a href="https://.com" className="hover:underline">
            Privacy
          </a>
          <a href="https://.com" className="hover:underline">
            Policy & Safety
          </a>
          <a href="https://.com" className="hover:underline">
            How Youtube Works
          </a>
          <a href="https://.com" className="hover:underline">
            Test New Features
          </a>
        </div> */}
        <p className="text-gray-400">
          <a
            href="https://.com"
            className="transition-all hover:text-emerald-400"
          >
            Mohamed Bechir Mejri
          </a>{" "}
          © 2022 .
        </p>
      </footer>
    </nav>
  );
}

export default Sidebar;
