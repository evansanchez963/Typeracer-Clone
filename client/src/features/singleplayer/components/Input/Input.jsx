import { useEffect, useRef } from "react";
import "./Input.css";

const Input = ({ gameStatus, onKeyDown, onChange, currInput, inputValid }) => {
  const typeInputRef = useRef(null);

  useEffect(() => {
    if (gameStatus === "started") {
      typeInputRef.current.focus();
    }
  }, [gameStatus]);

  return (
    <input
      className="singleplayer-typing-input"
      type="text"
      style={{ backgroundColor: inputValid ? "#222222" : "#d08383" }}
      maxLength={inputValid ? "default" : `${currInput.length}`}
      onKeyDown={onKeyDown}
      onChange={onChange}
      value={gameStatus === "started" ? currInput : ""}
      placeholder="Type in here when the race starts..."
      disabled={gameStatus === "started"}
      ref={typeInputRef}
    ></input>
  );
};

export default Input;
