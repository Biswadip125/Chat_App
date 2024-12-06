import React from "react";
import { TiMessages } from "react-icons/ti";
import { useSelector } from "react-redux";
const NoChatSelectedContainer = () => {
  const authUser = useSelector((store) => store.user.authUser);
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col px-4 text-center sm:text-lg md:text-xl text-gray-200 items-center gap-2 font-semibold">
        <p>Welcome 👋 Hello {authUser?.fullname} 🎉 </p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl text-center md:text-6xl" />
      </div>
    </div>
  );
};

export default NoChatSelectedContainer;
