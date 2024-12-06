import axios from "axios";
import React from "react";
import { BiLogOut } from "react-icons/bi";
import { BACKEND_API_URL } from "../../../utils/constant";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedConversation } from "../../../redux/conversationSlice";
import { setAuthUser } from "../../../redux/userSlice";

const Logoutbutton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${BACKEND_API_URL}/auth/logout`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setAuthUser(null));
        toast.success("Successfully logged out");

        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="mt-auto">
      <button onClick={logoutHandler}>
        <BiLogOut className="w-6 h-6 cursor-pointer " />
      </button>
    </div>
  );
};

export default Logoutbutton;
