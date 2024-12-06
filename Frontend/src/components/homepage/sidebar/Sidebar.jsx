import React, { useContext, useEffect } from "react";
import Otherusers from "./Otherusers";
import Logoutbutton from "./Logoutbutton";
import SearchInput from "./SearchInput";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedConversation } from "../../../redux/conversationSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const activeComponent = useSelector((store) => store.user.activeComponent);
  useEffect(() => {
    return () => {
      dispatch(setSelectedConversation(null));
    };
  }, []);
  return (
    <div
      className={`p-4 md:flex flex-col min-w-[350px] md:w-auto ${
        activeComponent === "users" ? "flex" : "hidden"
      }`}
    >
      <SearchInput />
      <div className="divider"></div>
      <Otherusers />
      <Logoutbutton />
    </div>
  );
};

export default Sidebar;
