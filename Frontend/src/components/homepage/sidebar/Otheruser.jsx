import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedConversation } from "../../../redux/conversationSlice";
import { setActiveComponent } from "../../../redux/userSlice";

const Otheruser = ({ otherUser, emoji, lastIdx }) => {
  const selectedConversation = useSelector(
    (store) => store.conversation.selectedConversation
  );
  const onlineUsers = useSelector((store) => store.user.onlineUsers);
  const isOnline = onlineUsers?.includes(otherUser?._id);
  const dispatch = useDispatch();

  const isSelected = selectedConversation?._id === otherUser._id;
  return (
    <div
      onClick={() => {
        dispatch(setSelectedConversation(otherUser));
        dispatch(setActiveComponent("chats"));
      }}
    >
      <div
        className={`flex gap-3 items-center hover:bg-purple-700 p-2 rounded-md cursor-pointer ${
          isSelected ? "bg-purple-700" : ""
        }`}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-10 rounded-full">
            <img src={otherUser.profilePhoto} alt="user-profile" />
          </div>
        </div>
        <div className="flex items-center flex-1">
          <div className="flex items-center justify-between w-full">
            <p className="text-gray-200 font-bold">{otherUser.fullname}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider my-0 py-0 h-1"></div>}
    </div>
  );
};

export default Otheruser;
