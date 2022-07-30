import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useUsername } from "../../../context/AuthContext";
import { useJoinRoom } from "../../../context/SocketContext";
import createGameCode from "../../../features/multiplayer/utils/createGameCode";
import "./PlayOnline.css";

const PlayOnline = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAuth();
  const joinRoomHandler = useJoinRoom();
  const username = useUsername();
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
            joinRoomHandler({
              room: gameCode,
              user: isLoggedIn ? username : "Guest",
            });
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
              joinRoomHandler({
                room: joinCode,
                user: isLoggedIn ? username : "Guest",
              });
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
