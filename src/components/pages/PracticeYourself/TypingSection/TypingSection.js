import "./TypingSection.css"

const TypingSection = ({ 
  words, 
  currInput, 
  inputValid,
  getWordClass,
  handleKeyDown, 
  handleChange 
}) => {
  return (
    <div id="typing-section">

      <div id="game-status-info">
        <p>The race is about to start...</p>
        <p>00:00</p>
      </div>

      <div id="game-progress">
        <progress id="progress" max="100" value="0"></progress>
        <p>0 WPM</p>
      </div>

      <div id="typing-box">
        <p>
          {
            words.map((word, wordIdx) => 
              <span key={word + wordIdx}>
                <span className={getWordClass(wordIdx)}>
                  {
                    word.split("").map((char, charIdx) => 
                      <span key={char + charIdx}>{char}</span>
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
        ></input>
      </div>
   
    </div>
  )
}

export default TypingSection