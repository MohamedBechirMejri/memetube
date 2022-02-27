import React, { useContext, useState } from "react";
import { MdOutlineAddBox } from "react-icons/md";
// import { RiApps2Line, RiNotification3Line } from "react-icons/ri";
import UserContext from "../../Utils/UserContext";

function Userstuff(): JSX.Element {
  const user: {
    name: string;
  } = useContext(UserContext);
  const [isAddVideoShown, setIsAddVideoShown] = useState(false);
  return (
    <div className="flex items-center justify-center h-full gap-4 p-4 text-2xl">
      {!user.name && (
        <button
          type="button"
          onClick={() => {
            setIsAddVideoShown(!isAddVideoShown);
          }}
        >
          <MdOutlineAddBox />
        </button>
      )}{" "}
      {/* <button type="button">
        <RiApps2Line />
      </button> */}
      {/* <button type="button">
        <RiNotification3Line />
      </button> */}
      <button type="button">
        {!user.name ? (
          <button type="button" className="">
            Login
          </button>
        ) : (
          user.name
        )}
      </button>
    </div>
  );
}

export default Userstuff;
