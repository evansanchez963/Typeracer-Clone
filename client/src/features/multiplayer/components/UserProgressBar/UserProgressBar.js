import { useState, useEffect, useCallback } from "react";
import { useSocket, useRoomCode } from "../../../../context/SocketContext";
import "./UserProgressBar.css";

const UserProgressBar = ({ recieveDataFrom, chars, charsTyped, WPM }) => {
  const socket = useSocket();
  const roomCode = useRoomCode();

  const [userCharsTyped, setUserCharsTyped] = useState(0);
  const [userWPM, setUserWPM] = useState(0);

  const recieveProgressHandler = useCallback((data) => {
    setUserCharsTyped(data.charsTyped);
    setUserWPM(data.WPM);
  }, []);

  // If this progress bar displays the host's progress, send progress to others in room.
  useEffect(() => {
    if (recieveDataFrom === socket.id) {
      socket.emit("send_progress_data", {
        room: roomCode,
        charsTyped: charsTyped,
        WPM: WPM,
      });
    }
  }, [recieveDataFrom, socket, roomCode, charsTyped, WPM]);

  // Display other users progress in order of roster.
  useEffect(() => {
    socket.on(`recieve_${recieveDataFrom}_progress`, recieveProgressHandler);

    return () =>
      socket.off(`recieve_${recieveDataFrom}_progress`, recieveProgressHandler);
  }, [recieveDataFrom, socket, recieveProgressHandler]);

  return (
    <div className="user-progress">
      <progress
        className="user-progress-bar"
        max={chars.length - 1}
        value={recieveDataFrom === socket.id ? charsTyped : userCharsTyped}
      ></progress>
      <p>{recieveDataFrom === socket.id ? WPM : userWPM} WPM</p>
    </div>
  );
};

export default UserProgressBar;
