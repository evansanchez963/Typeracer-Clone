import "./TypingSection.css"

const TypingSection = ({ words, handleInput }) => {
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
            words.map((word, index) => 
              <span key={word + index}>
                <span>
                  {
                    word.split("").map((char, index) => 
                      <span key={char + index}>{char}</span>
                    )
                  }  
                </span>  
                <span> </span>
              </span>
            )
          }
        </p>
        <input id="typing-input" type="text" onKeyDown={handleInput} placeholder="Type in here when the race starts..."></input>
      </div>
   
    </div>
  )
}

export default TypingSection