import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BACKEND_API_URL } from "../utils/constant";
import { setMessages } from "../redux/conversationSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const useGetMesssage = () => {
  const [loading, setLoading] = useState(false);
  const selectedConversation = useSelector(
    (store) => store.conversation.selectedConversation
  );

  const dispatch = useDispatch();
  useEffect(() => {
    const getMessage = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${BACKEND_API_URL}/messages/${selectedConversation._id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (res.data) {
          dispatch(setMessages(res.data.messages || []));
        }
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?._id) getMessage();
  }, [selectedConversation?._id, setMessages]);

  return { loading };
};

export default useGetMesssage;
