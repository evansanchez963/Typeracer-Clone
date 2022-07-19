import { useEffect, useRef } from "react";
import handleKeyDown from "../../utils/handleKeyDown";
import "./Input.css";

const Input = ({ gameStatus, textInfo, inputInfo, idxInfo, typeInfo }) => {
  const typeInputRef = useRef(null);

  useEffect(() => {
    if (gameStatus.isStarted || !gameStatus.isEnded) {
      typeInputRef.current.focus();
    }
  }, [gameStatus.isStarted, gameStatus.isEnded]);

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
      onChange={(e) => {
        if (!/\s/.test(e.target.value)) inputInfo.setCurrInput(e.target.value);
      }}
      value={inputInfo.currInput}
      placeholder="Type in here when the race starts..."
      disabled={!gameStatus.isStarted || gameStatus.isEnded}
      ref={typeInputRef}
    ></input>
  );
};

export default Input;
