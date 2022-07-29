import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:5000");
const SocketContext = React.createContext();
const RoomCodeContext = React.createContext();
const JoinRoomContext = React.createContext();

const useSocket = () => {
  return useContext(SocketContext);
};

const useRoomCode = () => {
  return useContext(RoomCodeContext);
};

const useJoinRoom = () => {
  return useContext(JoinRoomContext);
};

const SocketProvider = ({ children }) => {
  const [joinedRoomCode, setJoinedRoomCode] = useState("");
  const location = useLocation();

  const joinRoomHandler = (roomId) => {
    socket.emit("join_room", roomId);
    setJoinedRoomCode(roomId);
  };

  const leaveRoomHandler = (roomId) => {
    socket.emit("leave_room", roomId);
    setJoinedRoomCode("");
  };

  // When user leaves gameroom page disconnect them from the room they were last in.
  useEffect(() => {
    if (
      location.pathname !== `/gameroom/${joinedRoomCode}` &&
      joinedRoomCode !== ""
    ) {
      leaveRoomHandler(joinedRoomCode);
    }
  }, [joinedRoomCode, location]);

  return (
    <SocketContext.Provider value={socket}>
      <RoomCodeContext.Provider value={joinedRoomCode}>
        <JoinRoomContext.Provider value={joinRoomHandler}>
          {children}
        </JoinRoomContext.Provider>
      </RoomCodeContext.Provider>
    </SocketContext.Provider>
  );
};

export { useSocket, useRoomCode, useJoinRoom, SocketProvider };
