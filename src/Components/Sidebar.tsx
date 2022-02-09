/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import UseAnimations from "react-useanimations";
import menu4 from "react-useanimations/lib/menu4";
import ytLogoLight from "../Assets/Images/Logos/yt-logo-light.png";
import ytLogoDark from "../Assets/Images/Logos/yt-logo-dark.png";

function Sidebar(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col items-start justify-start h-screen ">
      <div className="flex items-center">
        <span
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <UseAnimations
            animation={menu4}
            size={56}
            style={{ cursor: "pointer", padding: 100 }}
          />
        </span>
        <Link to="/">
          {" "}
          <img src={ytLogoDark} alt="Youtube Logo" className="w-[6em]" />
        </Link>
      </div>
      <div
        className={`overflow-y-scroll transition-all ${
          isOpen ? "w-0" : "w-fit"
        } `}
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
        <hr />
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
        <hr />
        <div>
          <h2>Subscriptions</h2>
          <div>
            {/* filter of top 7 subs else if show more then map of subs */}
          </div>
          <div className="flex items-center justify-start w-full gap-2 p-3 transition-all hover:bg-gray-600 hover:text-white">
            <span>i</span> show more/less
          </div>
        </div>
        <hr />
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
        <hr />
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
      </div>
    </div>
  );
}

export default Sidebar;
