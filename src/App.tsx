import React from "react";
import Sidebar from "./Components/Sidebar";

function App(): JSX.Element {
  return (
    <div className="bg-white dark:bg-[#1f232c] min-h-screen w-screen">
      <Sidebar />
    </div>
  );
}
export default App;
