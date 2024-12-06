import React from "react";
import { useSelector } from "react-redux";
import { extractDate } from "../../../utils/extractDate";

const Message = ({ message }) => {
  const authUser = useSelector((store) => store.user.authUser);
  const selectedConversation = useSelector(
    (store) => store.conversation.selectedConversation
  );
  const fromMe = message?.senderId === authUser?._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePhoto
    : selectedConversation.profilePhoto;

  const bubbleBgColor = fromMe ? "bg-purple-700" : "bg-gray-900";
  const formattedTime = extractDate(message.createdAt);
  const shakeClass = message.shouldShake ? "shake" : "";
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble text-white ${shakeClass} ${bubbleBgColor}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
