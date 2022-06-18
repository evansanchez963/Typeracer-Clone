import { useEffect, useRef } from "react"
import "./Input.css"

const Input = ({ inputInfo, gameStatus, handleKeyDown, handleChange }) => {
  const typeInputRef = useRef(null)

  useEffect(() => {
    if(gameStatus.isStarted || !gameStatus.isEnded) {
      typeInputRef.current.focus()
    }
  }, [gameStatus.isStarted, gameStatus.isEnded])


  return (
    <input
      id="typing-input" 
      type="text" 
      style={{backgroundColor: inputInfo.inputValid ? "#222222":"#d08383"}}
      maxLength={inputInfo.inputValid ? "default":`${inputInfo.currInput.length}`}
      onKeyDown={handleKeyDown} 
      onChange={handleChange} 
      value={inputInfo.currInput} 
      placeholder="Type in here when the race starts..."
      disabled={!gameStatus.isStarted || gameStatus.isEnded}
      ref={typeInputRef}
    ></input>
  )
}

export default Input