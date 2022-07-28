import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../../context/SocketContext";
import createGameCode from "../../../features/multiplayer/utils/createGameCode";
import "./PlayOnline.css";

const PlayOnline = () => {
  const navigate = useNavigate();
  const socket = useSocket();

  const [gameCode, setGameCode] = useState(null);
  const [joinCode, setJoinCode] = useState(null);

  useEffect(() => {
    setGameCode(createGameCode());
  }, []);

  /*
  useEffect(() => {
    socket.on("connect", () => {
      console.log(`Connected with ID: ${socket.id}`);
    });
  }, [socket]);
  */

  const joinRoomHandler = () => {
    if (joinCode !== null && joinCode.length === 5) {
      navigate(`/gameroom/${joinCode}`);
    }
  };

  return (
    <section id="play-online">
      <div className="online-options">
        <h1>Game Code: {gameCode}</h1>
        <button onClick={() => navigate(`/gameroom/${gameCode}`)}>
          Create New Game
        </button>
        <h2>OR</h2>
        <input
          type="text"
          placeholder="Enter game code..."
          onChange={(e) => setJoinCode(e.target.value)}
          maxLength={5}
        ></input>
        <button onClick={joinRoomHandler}>Join Game</button>
      </div>
    </section>
  );
};

export default PlayOnline;
