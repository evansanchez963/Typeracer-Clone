import { useState, useEffect } from "react";
//import { useSocket, useRoomCode } from "../../../context/SocketContext";
import "./GameRoom.css";

const GameRoom = () => {
  const [joinedUsers, setJoinedUsers] = useState([]);
  /*
  const socket = useSocket();
  const room = useRoomCode();

  const handleJoinedUsers = (data) => {
    setJoinedUsers([...joinedUsers, data.user]);
  };

  useEffect(() => {}, [socket]);

  const renderUsers = () => {
    return joinedUsers.map((user, index) => (
      <div key={user + index}>
        <p>{user}</p>
      </div>
    ));
  };
  */

  return (
    <section id="game-room">
      <h1>Connected Users: {joinedUsers.length}</h1>
    </section>
  );
};

export default GameRoom;
