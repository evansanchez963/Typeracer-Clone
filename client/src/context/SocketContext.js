import React, { useContext } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");
const SocketContext = React.createContext();

const useSocket = () => {
  return useContext(SocketContext);
};

const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { useSocket, SocketProvider };
