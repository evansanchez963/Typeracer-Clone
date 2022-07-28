import { useState, useEffect } from "react";
import { useSocket } from "../../../context/SocketContext";
import createGameCode from "../../../features/multiplayer/utils/createGameCode";
import "./PlayOnline.css";

const PlayOnline = () => {
  const socket = useSocket();

  const [gameCode, setGameCode] = useState(null);

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

  return (
    <section id="play-online">
      <div className="online-options">
        <h1>Game Code: {gameCode}</h1>
        <button>Create New Game</button>
        <h2>OR</h2>
        <input
          type="text"
          placeholder="Enter game code..."
          maxLength={5}
        ></input>
        <button>Join Game</button>
      </div>
    </section>
  );
};

export default PlayOnline;
