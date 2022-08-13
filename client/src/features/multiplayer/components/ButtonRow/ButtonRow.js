import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSocket, useRoomCode } from "../../../../context/SocketContext";
import "./ButtonRow.css";

const ButtonRow = ({ isClientEnded }) => {
  const socket = useSocket();
  const roomCode = useRoomCode();

  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    if (!isClientEnded) setIsWaiting(false);
  }, [isClientEnded]);

  return (
    <div className="gameroom-btn-row">
      <Link to="/">
        <button className="leave-room">Main menu (leave room)</button>
      </Link>
      <button
        className={isWaiting ? "restart-waiting" : "restart-ready"}
        style={{ display: isClientEnded ? "block" : "none" }}
        onClick={() => {
          setIsWaiting(true);
          socket.emit("send_client_ready", { room: roomCode });
        }}
      >
        {isWaiting ? "Waiting..." : "Restart?"}
      </button>
    </div>
  );
};

export default ButtonRow;
