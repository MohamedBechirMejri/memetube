import React, { useContext, useState } from "react";
import { MdOutlineAddBox } from "react-icons/md";
import UserContext from "../../Utils/UserContext";

function Userstuff(): JSX.Element {
  const user: {
    name: string;
  } = useContext(UserContext);

  const [isAddVideoShown, setIsAddVideoShown] = useState(true);

  return !user.name ? (
    <div className="flex items-center justify-center h-full gap-4 p-4 text-2xl">
      <MdOutlineAddBox
        onClick={() => {
          setIsAddVideoShown(!isAddVideoShown);
        }}
        className={` text-3xl transition-all cursor-pointer hover:scale-105 active:scale-95 ${
          isAddVideoShown && "rotate-45"
        } `}
      />
      {user.name}
    </div>
  ) : (
    <button
      type="button"
      className="px-4 py-2 text-xl font-semibold border border-[#cf2d2b] mx-1 rounded-lg hover:bg-[#cf2d2b] transition-all active:scale-95"
    >
      login
    </button>
  );
}

export default Userstuff;
