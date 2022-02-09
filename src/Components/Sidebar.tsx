import React from "react";
import { NavLink } from "react-router-dom";
import {
  MdExpandLess,
  MdExpandMore,
  MdOndemandVideo,
  MdOutlineExplore,
  MdOutlineHistory,
  MdOutlineSubscriptions,
  MdOutlineVideoLibrary,
  MdOutlineWatchLater,
} from "react-icons/md";
import { RiHeart2Line, RiSettings3Line } from "react-icons/ri";
import { BsPatchExclamation } from "react-icons/bs";
import { TiHomeOutline } from "react-icons/ti";

function Sidebar({ isSidebarOpen }: { isSidebarOpen: boolean }): JSX.Element {
  return (
    <nav
      className={`flex flex-col items-start justify-start h-full overflow-y-scroll overflow-x-hidden transition-all w-fit max-w-[40vw] ${
        isSidebarOpen ? "animate-revealSidebar" : "animate-hideSidebar"
      } noscroll `}
    >
      <div className="flex flex-col w-full">
        <NavLink
          to="/"
          className="flex items-center justify-start w-full gap-2 p-3 transition-all hover:bg-gray-600 hover:text-white"
        >
          <span>
            <TiHomeOutline />
          </span>{" "}
          Home
        </NavLink>
        <NavLink
          to="/"
          className="flex items-center justify-start w-full gap-2 p-3 transition-all hover:bg-gray-600 hover:text-white"
        >
          <span>
            <MdOutlineExplore />
          </span>{" "}
          Explore
        </NavLink>
        <NavLink
          to="/"
          className="flex items-center justify-start w-full gap-2 p-3 transition-all hover:bg-gray-600 hover:text-white"
        >
          <span>
            <MdOutlineSubscriptions />
          </span>{" "}
          Subscriptions
        </NavLink>
      </div>
      <hr className="w-full" />
      <div className="flex flex-col w-full">
        {" "}
        <NavLink
          to="/"
          className="flex items-center justify-start w-full gap-2 p-3 transition-all hover:bg-gray-600 hover:text-white"
        >
          <span>
            <MdOutlineVideoLibrary />
          </span>{" "}
          Library
        </NavLink>
        <NavLink
          to="/"
          className="flex items-center justify-start w-full gap-2 p-3 transition-all hover:bg-gray-600 hover:text-white"
        >
          <span>
            <MdOutlineHistory />
          </span>{" "}
          History
        </NavLink>
        <NavLink
          to="/"
          className="flex items-center justify-start w-full gap-2 p-3 transition-all hover:bg-gray-600 hover:text-white"
        >
          <span>
            <MdOndemandVideo />
          </span>{" "}
          Your Videos
        </NavLink>
        <NavLink
          to="/"
          className="flex items-center justify-start w-full gap-2 p-3 transition-all hover:bg-gray-600 hover:text-white"
        >
          <span>
            <MdOutlineWatchLater />
          </span>{" "}
          Watch later
        </NavLink>
        <NavLink
          to="/"
          className="flex items-center justify-start w-full gap-2 p-3 transition-all hover:bg-gray-600 hover:text-white"
        >
          <span>
            <RiHeart2Line />
          </span>{" "}
          Liked videos
        </NavLink>
        <div>{/* playlists map shown if show more == true */}</div>
        <div className="flex items-center justify-start w-full gap-2 p-3 transition-all hover:bg-gray-600 hover:text-white">
          <span>
            <MdExpandMore />
          </span>{" "}
          show more
        </div>
      </div>
      <hr className="w-full" />
      <div className="w-full">
        <h2>Subscriptions</h2>
        <div>
          {/* filter of top 7 subs else if show more then map of subs */}
        </div>
        <div className="flex items-center justify-start w-full gap-2 p-3 transition-all hover:bg-gray-600 hover:text-white">
          <span>
            {" "}
            <MdExpandLess />
          </span>{" "}
          show less
        </div>
      </div>
      <hr className="w-full" />
      <div className="w-full">
        <NavLink
          to="/"
          className="flex items-center justify-start w-full gap-2 p-3 transition-all hover:bg-gray-600 hover:text-white"
        >
          <span>
            <RiSettings3Line />
          </span>{" "}
          Settings
        </NavLink>{" "}
        <NavLink
          to="/"
          className="flex items-center justify-start w-full gap-2 p-3 transition-all hover:bg-gray-600 hover:text-white"
        >
          <span>
            <BsPatchExclamation />
          </span>{" "}
          Send Feedback
        </NavLink>
      </div>
      <hr className="w-full" />
      <footer>
        <div>
          <a href="https://.com">About</a>
          <a href="https://.com">About</a>
          <a href="https://.com">About</a>
          <a href="https://.com">About</a>
          <a href="https://.com">About</a>
          <a href="https://.com">About</a>
          <a href="https://.com">About</a>
        </div>{" "}
        <div>
          <a href="https://.com">About</a>
          <a href="https://.com">About</a>
          <a href="https://.com">About</a>
          <a href="https://.com">About</a>
          <a href="https://.com">About</a>
        </div>
        <p>
          © 2022 <a href="https://.com">Mohamed Bechir</a>
        </p>
      </footer>
    </nav>
  );
}

export default Sidebar;
