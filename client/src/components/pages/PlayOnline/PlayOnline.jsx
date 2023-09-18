import { useState } from "react";
//import GameRoom from "./GameRoom/GameRoom";
import "./PlayOnline.css";

const PlayOnline = () => {
  const [isInRoom, setIsInRoom] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");

  const handleJoin = () => {
    if (roomCode === "") {
      setError("The room code must not be empty!");
    } else {
      setIsInRoom(true);
    }
  };

  /*
  if (isInRoom) {
    return <GameRoom roomCode={roomCode} />;
  }
  */
  return (
    <section id="play-online">
      <div className="online-options">
        <h1>Join a Room</h1>
        <div className="play-online-input-wrapper">
          {error && <span className="play-online-error-message">*{error}</span>}
          <input
            type="text"
            placeholder="Enter room code..."
            onChange={(e) => setRoomCode(e.target.value)}
          ></input>
        </div>
        <button onClick={handleJoin}>Join Game</button>
      </div>
    </section>
  );
};

export default PlayOnline;
