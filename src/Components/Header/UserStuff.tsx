import React from "react";
import { MdOutlineAddBox } from "react-icons/md";
import { RiApps2Line, RiNotification3Line } from "react-icons/ri";

function Userstuff(): JSX.Element {
  return (
    <div className="flex items-center h-full gap-4 text-2xl">
      <button type="button">
        <MdOutlineAddBox />
      </button>
      <button type="button">
        <RiApps2Line />
      </button>
      <button type="button">
        <RiNotification3Line />
      </button>
      <button type="button">user</button>
    </div>
  );
}

export default Userstuff;
