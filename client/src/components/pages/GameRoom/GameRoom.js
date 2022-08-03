import { useState, useEffect } from "react";
import { useSocket, useRoomCode } from "../../../context/SocketContext";
import {
  GameroomStatusInfo,
  UserProgressBar,
} from "../../../features/multiplayer/components/index";
import "./GameRoom.css";

const GameRoom = () => {
  const [userRoster, setUserRoster] = useState({});

  const socket = useSocket();
  const roomCode = useRoomCode();

  const updateJoinedUsers = (data) => {
    const userInfo = {};
    for (const client in data) {
      userInfo[client] = data[client];
    }
    setUserRoster(userInfo);
  };

  const renderUsers = () => {
    return (
      <div className="user-list">
        {Object.keys(userRoster).map((client) => {
          return (
            <div key={client} className="user">
              {userRoster[client]} {socket.id === client ? "(you)" : ""}
              <UserProgressBar></UserProgressBar>
            </div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    socket.on("get_user_roster", updateJoinedUsers);
    socket.emit("connect_to_room", { room: roomCode });

    return () => socket.off("get_user_roster", updateJoinedUsers);
  }, [socket, roomCode]);

  return (
    <section id="game-room">
      <div className="multiplayer-wrapper">
        <div className="multiplayer-typing-section">
          <GameroomStatusInfo></GameroomStatusInfo>
          {renderUsers()}
        </div>
      </div>
    </section>
  );
};

export default GameRoom;
