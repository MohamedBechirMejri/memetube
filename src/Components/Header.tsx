/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { Link } from "react-router-dom";
import UseAnimations from "react-useanimations";
import menu4 from "react-useanimations/lib/menu4";
import ytLogoLight from "../Assets/Images/Logos/yt-logo-light.png";
import ytLogoDark from "../Assets/Images/Logos/yt-logo-dark.png";
import Searchbar from "./Header/Searchbar";
import Userstuff from "./Header/UserStuff";

function Header({
  isDarkMode,
  setIsDarkMode,
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isDarkMode: boolean;
  setIsDarkMode: (isDarkModeArg: boolean) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpenArg: boolean) => void;
}): JSX.Element {
  return (
    <div className="flex items-center justify-between w-screen border-b-[.1px] border-[#2c323a]">
      {" "}
      <div className="flex items-center gap-4 p-4 w-[14.5em]">
        <span
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
          className="transition-all duration-200 ease-in-out bg-white rounded-full cursor-pointer hover:scale-105 active:scale-95"
        >
          <UseAnimations
            animation={menu4}
            style={{ cursor: "pointer", padding: 100 }}
          />
        </span>
        <Link to="/">
          {" "}
          <img
            src={isDarkMode ? ytLogoDark : ytLogoLight}
            alt="Youtube Logo"
            className="w-[6em]"
          />
        </Link>
      </div>
      <Searchbar />
      <Userstuff />
    </div>
  );
}

export default Header;
