import React, { useEffect } from "react";
import Otheruser from "./Otheruser";
import useGetOtherUsers from "../../../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";
import { getEmoji } from "../../../utils/getEmoji";

const Otherusers = () => {
  const { loading } = useGetOtherUsers();

  const otherUsers = useSelector((store) => store.user.otherUsers);

  return (
    <div className="overflow-y-auto ">
      {loading ? (
        <div className="flex text-center h-full items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        otherUsers?.map((otherUser, idx) => (
          <Otheruser
            otherUser={otherUser}
            key={otherUser._id}
            emoji={getEmoji()}
            lastIdx={idx === otherUsers.length - 1}
          />
        ))
      )}
    </div>
  );
};

export default Otherusers;
