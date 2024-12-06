import React, { useRef, useEffect } from "react";
import Message from "./Message";
import useGetMesssages from "../../../hooks/useGetMessages";
import { useSelector } from "react-redux";
import MessageSkeleton from "./MessageSkeleton";
import useListenMessages from "../../../hooks/useListenMessages";

const Messages = () => {
  const { loading } = useGetMesssages();
  const messages = useSelector((store) => store.conversation.messages);
  const lastMessageRef = useRef();
  useListenMessages();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto ">
      {!loading &&
        messages?.length > 0 &&
        messages?.map((message, idx) => (
          <div key={idx} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages?.length === 0 && (
        <p className="text-center text-gray-400">
          Send a Message to start the Conversation
        </p>
      )}
    </div>
  );
};

export default Messages;
