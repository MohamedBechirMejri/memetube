import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar({ isSidebarOpen }: { isSidebarOpen: boolean }): JSX.Element {
  return (
    <nav
      className={`flex flex-col items-start justify-start h-full overflow-y-scroll overflow-x-hidden transition-all w-fit max-w-[40vw] ${
        isSidebarOpen ? "animate-revealSidebar" : "animate-hideSidebar"
      } noscroll `}
    >
      <div className="flex flex-col">
        <NavLink
          to="/"
          className="flex items-center justify-start w-full gap-2 p-3 transition-all hover:bg-gray-600 hover:text-white"
        >
          <span>i</span> Home
        </NavLink>
        <NavLink
          to="/"
          className="flex items-center justify-start w-full gap-2 p-3 transition-all hover:bg-gray-600 hover:text-white"
        >
          <span>i</span> Explore
        </NavLink>
        <NavLink
          to="/"
          className="flex items-center justify-start w-full gap-2 p-3 transition-all hover:bg-gray-600 hover:text-white"
        >
          <span>i</span> Subscriptions
        </NavLink>
      </div>
      <hr className="w-full" />
      <div className="flex flex-col">
        {" "}
        <NavLink
          to="/"
          className="flex items-center justify-start w-full gap-2 p-3 transition-all hover:bg-gray-600 hover:text-white"
        >
          <span>i</span> Library
        </NavLink>
        <NavLink
          to="/"
          className="flex items-center justify-start w-full gap-2 p-3 transition-all hover:bg-gray-600 hover:text-white"
        >
          <span>i</span> History
        </NavLink>
        <NavLink
          to="/"
          className="flex items-center justify-start w-full gap-2 p-3 transition-all hover:bg-gray-600 hover:text-white"
        >
          <span>i</span> Your Videos
        </NavLink>
        <NavLink
          to="/"
          className="flex items-center justify-start w-full gap-2 p-3 transition-all hover:bg-gray-600 hover:text-white"
        >
          <span>i</span> Watch later
        </NavLink>
        <NavLink
          to="/"
          className="flex items-center justify-start w-full gap-2 p-3 transition-all hover:bg-gray-600 hover:text-white"
        >
          <span>i</span> Liked videos
        </NavLink>
        <div>{/* playlists map shown if show more == true */}</div>
        <div className="flex items-center justify-start w-full gap-2 p-3 transition-all hover:bg-gray-600 hover:text-white">
          <span>i</span> show more/less
        </div>
      </div>
      <hr className="w-full" />
      <div>
        <h2>Subscriptions</h2>
        <div>
          {/* filter of top 7 subs else if show more then map of subs */}
        </div>
        <div className="flex items-center justify-start w-full gap-2 p-3 transition-all hover:bg-gray-600 hover:text-white">
          <span>i</span> show more/less
        </div>
      </div>
      <hr className="w-full" />
      <div>
        <NavLink
          to="/"
          className="flex items-center justify-start w-full gap-2 p-3 transition-all hover:bg-gray-600 hover:text-white"
        >
          <span>i</span> Settings
        </NavLink>{" "}
        <NavLink
          to="/"
          className="flex items-center justify-start w-full gap-2 p-3 transition-all hover:bg-gray-600 hover:text-white"
        >
          <span>i</span> Send Feedback
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
