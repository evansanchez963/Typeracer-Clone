import { useState, useEffect } from "react";
import { useSocket, useRoomCode } from "../../../context/SocketContext";
import "./GameRoom.css";

const GameRoom = () => {
  const [userRoster, setUserRoster] = useState({});

  const socket = useSocket();
  const roomCode = useRoomCode();

  const updateJoinedUsers = (data) => {
    setUserRoster({});
    const userInfo = {};
    for (const client in data) {
      userInfo[client] = data[client];
    }
    setUserRoster(userInfo);
  };

  const renderUsers = () => {
    return (
      <ul>
        {Object.keys(userRoster).map((client) => {
          return (
            <li key={client}>
              {userRoster[client]} {socket.id === client ? "(you)" : ""}
            </li>
          );
        })}
      </ul>
    );
  };

  useEffect(() => {
    socket.on("get_user_roster", updateJoinedUsers);
    socket.emit("connect_to_room", { room: roomCode });

    return () => socket.off("get_user_roster", updateJoinedUsers);
  }, [socket, roomCode]);

  return (
    <section id="game-room">
      <h1>Connected Users: {Object.keys(userRoster).length}</h1>
      {renderUsers()}
    </section>
  );
};

export default GameRoom;
