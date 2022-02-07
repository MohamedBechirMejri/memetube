import React from "react";
import ytLogoLight from "../Assets/Images/Logos/yt-logo-light.png";

function Sidebar(): JSX.Element {
  return (
    <div>
      <div>
        <span>|||</span>
        <img src={ytLogoLight} alt="Youtube Logo" />
      </div>
    </div>
  );
}

export default Sidebar;
