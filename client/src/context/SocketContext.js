import React, { useState, useContext } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");
const SocketContext = React.createContext();
const RoomCodeContext = React.createContext();
const JoinRoomContext = React.createContext();
const LeaveRoomContext = React.createContext();

const useSocket = () => {
  return useContext(SocketContext);
};

const useRoomCode = () => {
  return useContext(RoomCodeContext);
};

const useJoinRoom = () => {
  return useContext(JoinRoomContext);
};

const useLeaveRoom = () => {
  return useContext(LeaveRoomContext);
};

const SocketProvider = ({ children }) => {
  const [joinedRoomCode, setJoinedRoomCode] = useState("");

  const joinRoomHandler = (roomId) => {
    socket.emit("join_room", roomId);
    setJoinedRoomCode(roomId);
  };

  const leaveRoomHandler = (roomId) => {
    socket.emit("leave_room", roomId);
    setJoinedRoomCode("");
  };

  return (
    <SocketContext.Provider value={socket}>
      <RoomCodeContext.Provider value={joinedRoomCode}>
        <JoinRoomContext.Provider value={joinRoomHandler}>
          <LeaveRoomContext.Provider value={leaveRoomHandler}>
            {children}
          </LeaveRoomContext.Provider>
        </JoinRoomContext.Provider>
      </RoomCodeContext.Provider>
    </SocketContext.Provider>
  );
};

export { useSocket, useRoomCode, useJoinRoom, useLeaveRoom, SocketProvider };
