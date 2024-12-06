import axios from "axios";
import { BACKEND_API_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { setMessages } from "../redux/conversationSlice";
import { useState } from "react";
const useSendMessage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const selectedConversation = useSelector(
    (store) => store.conversation.selectedConversation
  );

  const messages = useSelector((store) => store.conversation.messages);

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${BACKEND_API_URL}/messages/send/${selectedConversation._id}`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(setMessages([...messages, res.data.newMessage]));
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendMessage };
};

export default useSendMessage;
