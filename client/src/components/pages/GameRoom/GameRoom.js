import { useState, useEffect } from "react";
import {
  useSocket,
  useRoomCode,
  useLeaveRoom,
} from "../../../context/SocketContext";
import "./GameRoom.css";

const GameRoom = () => {
  const socket = useSocket();
  const joinedRoomCode = useRoomCode();
  const leaveRoomHandler = useLeaveRoom();

  const [joinedUsers, setJoinedUsers] = useState([]);

  useEffect(() => {
    // Leave room when this component unmounts.
    return leaveRoomHandler(joinedRoomCode);
  }, [socket]);

  return <section id="game-room"></section>;
};

export default GameRoom;
