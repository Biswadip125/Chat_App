import React, { useEffect, useState } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import NoChatSelectedContainer from "../NoChatSelectedContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  setMessages,
  setSelectedConversation,
} from "../../../redux/conversationSlice";
import { setActiveComponent } from "../../../redux/userSlice";
import { FaArrowLeft } from "react-icons/fa6";
const MessageContainer = () => {
  const selectedConversation = useSelector(
    (store) => store.conversation.selectedConversation
  );

  const activeComponent = useSelector((store) => store.user.activeComponent);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setMessages(null));
      dispatch(setActiveComponent("users"));
    };
  }, []);

  return (
    <div
      className={`md:min-w-[450px] min-w-[350px] md:flex flex-col ${
        activeComponent === "users" ? "hidden" : "flex"
      } 
      `}
    >
      {selectedConversation ? (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2 flex items-center gap-1">
            <span className="flex items-center justify-center md:hidden cursor-pointer">
              {activeComponent === "chats" && (
                <FaArrowLeft
                  onClick={() => {
                    dispatch(setActiveComponent("users"));
                    dispatch(setSelectedConversation(null));
                  }}
                />
              )}
            </span>
            <span className="label-text font-semibold">To: </span>
            <span className="text-gray-900 font-bold">
              {selectedConversation.fullname}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      ) : (
        <NoChatSelectedContainer />
      )}
    </div>
  );
};

export default MessageContainer;
