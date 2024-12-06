import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedConversation } from "../../../redux/conversationSlice";
import { setActiveComponent } from "../../../redux/userSlice";
const SearchInput = () => {
  const [search, setSearch] = useState("");
  const otherUsers = useSelector((store) => store.user.otherUsers);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }
    const conversation = otherUsers.find((otherUser) =>
      otherUser.fullname.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      dispatch(setSelectedConversation(conversation));
      dispatch(setActiveComponent("chats"));
      setSearch("");
    } else {
      toast.error("No such user found");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center gap-3">
          <input
            className="input input-bordered rounded-full"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button type="submit" className="btn btn-circle bg-purple-700">
            <BiSearchAlt2 size={20} color={"white"} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
