import React from "react";
import Sidebar from "./sidebar/Sidebar";
import MessageContainer from "./messagecontainer/MessageContainer";

const Homepage = () => {
  return (
    <div className="flex h-[500px]  md:h-[600px] rounded-lg overflow-hidden bg-gray-400 shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border ">
      <Sidebar />
      <div className="divider divider-horizontal mx-0 px-0 w-1 "></div>
      <MessageContainer />
    </div>
  );
};

export default Homepage;
