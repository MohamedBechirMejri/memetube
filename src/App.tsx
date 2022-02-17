import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Sidebar from "./Components/Sidebar";
import Video from "./Components/Video";

function App(): JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-[#1f232c] min-h-screen w-screen dark:text-white flex flex-col items-start justify-start overflow-hidden">
      <Header
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />{" "}
      <div className="flex w-full">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/video/:videoId" element={<Video />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
