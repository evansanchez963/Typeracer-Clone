import { useState, useEffect } from "react";
//import { useSocket } from "../../../context/SocketContext";
import "./PlayOnline.css";

const PlayOnline = () => {
  //const socket = useSocket();

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
        <h1>Game Code: 00000</h1>
        <button>Create New Game</button>

        <h2>OR</h2>

        <input type="text" placeholder="Enter game code..."></input>
        <button>Join Game</button>
      </div>
    </section>
  );
};

export default PlayOnline;
