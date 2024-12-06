import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { setOnlineUsers } from "../redux/userSlice";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const authUser = useSelector((store) => store.user.authUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (authUser) {
      const socket = io("https://chat-app-emss.onrender.com", {
        query: {
          userId: authUser._id,
        },
      });
      socket.on("connect", () => {
        setSocket(socket);
      });

      socket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
