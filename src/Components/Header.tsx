/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { Link } from "react-router-dom";
import UseAnimations from "react-useanimations";
import menu4 from "react-useanimations/lib/menu4";
import ytLogoLight from "../Assets/Images/Logos/yt-logo-light.png";
import ytLogoDark from "../Assets/Images/Logos/yt-logo-dark.png";

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
    <div>
      {" "}
      <div className="flex items-center">
        <span
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);
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
    </div>
  );
}

export default Header;
