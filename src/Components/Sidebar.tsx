import React from "react";
import { Link } from "react-router-dom";
import ytLogoLight from "../Assets/Images/Logos/yt-logo-light.png";
import ytLogoDark from "../Assets/Images/Logos/yt-logo-dark.png";

function Sidebar(): JSX.Element {
  return (
    <div className="flex flex-col h-screen max-w-screen-sm overflow-y-scroll w-fit">
      <div className="flex">
        <span>|||</span>
        <Link to="/">
          {" "}
          <img src={ytLogoDark} alt="Youtube Logo" className="w-[7em]" />
        </Link>
      </div>
      <div className="flex flex-col">
        <Link to="/">
          <span>i</span> Home
        </Link>
        <Link to="/">
          <span>i</span> Explore
        </Link>

        <Link to="/">
          <span>i</span> Subscriptions
        </Link>
      </div>
      <hr />
      <div className="flex flex-col">
        {" "}
        <Link to="/">
          <span>i</span> Library
        </Link>
        <Link to="/">
          <span>i</span> History
        </Link>
        <Link to="/">
          <span>i</span> Your Videos
        </Link>
        <Link to="/">
          <span>i</span> Watch later
        </Link>
        <Link to="/">
          <span>i</span> Liked videos
        </Link>
        <div>{/* playlists map shown if show more == true */}</div>
        <div>
          <span>i</span> show more/less
        </div>
      </div>
      <hr />
      <div>
        <h2>Subscriptions</h2>
        <div>
          {/* filter of top 7 subs else if show more then map of subs */}
        </div>
        <div>
          <span>i</span> show more/less
        </div>
      </div>
      <hr />
      <div>
        <Link to="/">
          <span>i</span> Settings
        </Link>{" "}
        <Link to="/">
          <span>i</span> Send Feedback
        </Link>
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
  );
}

export default Sidebar;
