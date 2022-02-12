import React, { useState } from "react";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Sidebar from "./Components/Sidebar";

function App(): JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="bg-white dark:bg-[#1f232c] min-h-screen w-screen dark:text-white flex flex-col items-start justify-start">
      <Header
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />{" "}
      <div className="flex ">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <Home />
      </div>
    </div>
  );
}
export default App;
