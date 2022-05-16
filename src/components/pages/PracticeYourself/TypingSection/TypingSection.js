import "./TypingSection.css"

const TypingSection = ({ paragraph }) => {
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
        <p>{paragraph}</p>
        <input id="typing-input" type="text" placeholder="Type in here when the race starts..."></input>
      </div>

    </div>
  )
}

export default TypingSection