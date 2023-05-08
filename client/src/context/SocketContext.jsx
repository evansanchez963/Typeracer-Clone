import { useState, createContext, useContext } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");
const SocketContext = createContext();

const useSocket = () => {
  return useContext(SocketContext);
};

const SocketProvider = ({ children }) => {
  const [joinedRoomCode, setJoinedRoomCode] = useState("");

  // User can either join a room or not be allowed to because it is full.
  const handleJoinRoom = async (data) => {
    return new Promise((resolve, reject) => {
      socket.emit("join_room", data);
      socket.on("join_room_success", () => {
        setJoinedRoomCode(data.room);
        resolve(true);
      });
      socket.on("join_room_error", (data) => reject(data));
    });
  };

  const handleLeaveRoom = (data) => {
    socket.emit("leave_room", data);
    setJoinedRoomCode("");
  };

  return (
    <SocketContext.Provider
      value={{ socket, joinedRoomCode, handleJoinRoom, handleLeaveRoom }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { useSocket, SocketProvider };
