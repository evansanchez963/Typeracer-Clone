import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useUserId } from "../../../context/AuthContext";
import { useJoinRoom } from "../../../context/SocketContext";
import createGameCode from "../../../features/multiplayer/utils/createGameCode";
import "./PlayOnline.css";

const PlayOnline = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAuth();
  const userId = useUserId();
  const joinRoomHandler = useJoinRoom();
  const [username, setUsername] = useState("");
  const [gameCode, setGameCode] = useState("");
  const [joinCode, setJoinCode] = useState("");

  // Create a 5 character room code every time component is mounted.
  useEffect(() => {
    setGameCode(createGameCode());
  }, []);

  return (
    <section id="play-online">
      <div className="online-options">
        <h1>Game Code: {gameCode}</h1>
        <button
          onClick={() => {
            joinRoomHandler(gameCode);
            navigate(`/gameroom/${gameCode}`);
          }}
        >
          Create New Game
        </button>
        <h2>OR</h2>
        <input
          type="text"
          placeholder="Enter game code..."
          onChange={(e) => setJoinCode(e.target.value)}
          maxLength={5}
        ></input>
        <button
          onClick={() => {
            if (joinCode.length === 5) {
              joinRoomHandler(joinCode);
              navigate(`/gameroom/${joinCode}`);
            }
          }}
        >
          Join Game
        </button>
      </div>
    </section>
  );
};

export default PlayOnline;
