import { useEffect, useRef } from "react"
import "./TypingSection.css"

const TypingSection = ({ 
  chars,
  words, 
  currInput, 
  inputValid,
  getWordClass,
  getCharClass,
  handleKeyDown, 
  handleChange, 
  isStarted,
  isEnded,
  countdown,
  countdownOn,
  gameTimer,
  gameTimerOn,
  charsTyped,
  WPM
}) => {
  const typeInputRef = useRef(null)

  useEffect(() => {
    if(isStarted || !isEnded) {
      typeInputRef.current.focus()
    }
  }, [isStarted, isEnded])

  const getStatusMsg = () => {
    if(isEnded) return <p>The race has ended!</p>
    else if(!isStarted) return <p>The race is about to start...</p>
    else if(isStarted) return <p>The race has started!</p>
  }

  const getTimer = () => {
    if(countdownOn) {
      const seconds = ("0" + (Math.floor(countdown / 1000) % 60)).slice(-2)
      return <p>00:{seconds}</p>
    } else if(gameTimerOn) {
      const minutes = ("0" + (Math.floor(gameTimer / 60000) % 60)).slice(-2)
      const seconds = ("0" + (Math.floor(gameTimer / 1000) % 60)).slice(-2)
      return <p>{minutes}:{seconds}</p>
    } else {
      return <p>00:00</p>
    }
  }

  return (
    <div id="typing-section">

      <div id="game-status-info">
        {getStatusMsg()}
        {getTimer()}
      </div>

      <div id="game-progress">
        <progress id="progress" max={chars.length - 1} value={charsTyped}></progress>
        <p>{WPM} WPM</p>
      </div>

      <div id="typing-box">
        <p>
          {
            words.map((word, wordIdx) => 
              <span key={word + wordIdx}>
                <span className={getWordClass(wordIdx)}>
                  {
                    word.split("").map((char, charIdx) => 
                      <span key={char + charIdx} className={getCharClass(char, charIdx, wordIdx)}>{char}</span>
                    )
                  }  
                </span>  
                <span> </span>
              </span>
            )
          }
        </p>
        <input 
          id="typing-input" 
          type="text" 
          style={{backgroundColor: inputValid ? "#222222":"#d08383"}}
          maxLength={inputValid ? "default":`${currInput.length}`}
          onKeyDown={handleKeyDown} 
          onChange={handleChange} 
          value={currInput} 
          placeholder="Type in here when the race starts..."
          disabled={!isStarted || isEnded}
          ref={typeInputRef}
        ></input>
      </div>
   
    </div>
  )
}

export default TypingSection