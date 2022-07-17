import { useEffect, useRef } from "react";
import handleKeyDown from "../../utils/handleKeyDown";
import "./Input.css";

const Input = ({ gameStatus, textInfo, inputInfo, idxInfo, typeInfo }) => {
  const typeInputRef = useRef(null);

  useEffect(() => {
    if (gameStatus.isGameStarted || !gameStatus.isGameEnded) {
      typeInputRef.current.focus();
    }
  }, [gameStatus.isGameStarted, gameStatus.isGameEnded]);

  return (
    <input
      id="typing-input"
      type="text"
      style={{ backgroundColor: inputInfo.inputValid ? "#222222" : "#d08383" }}
      maxLength={
        inputInfo.inputValid ? "default" : `${inputInfo.currInput.length}`
      }
      onKeyDown={(e) =>
        handleKeyDown(e, gameStatus, textInfo, inputInfo, idxInfo, typeInfo)
      }
      onChange={(e) => inputInfo.setCurrInput(e.target.value)}
      value={inputInfo.currInput}
      placeholder="Type in here when the race starts..."
      disabled={!gameStatus.isGameStarted || gameStatus.isGameEnded}
      ref={typeInputRef}
    ></input>
  );
};

export default Input;
