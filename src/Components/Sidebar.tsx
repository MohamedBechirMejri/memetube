import React from "react";
import ytLogoLight from "../Assets/Images/Logos/yt-logo-light.png";
import ytLogoDark from "../Assets/Images/Logos/yt-logo-dark.png";

function Sidebar(): JSX.Element {
  return (
    <div>
      <div>
        <span>|||</span>
        <img src={ytLogoDark} alt="Youtube Logo" />
      </div>
    </div>
  );
}

export default Sidebar;
