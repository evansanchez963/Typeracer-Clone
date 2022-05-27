import "./ProgressBar.css"

const ProgressBar = ({ chars, charsTyped, WPM }) => {
  return (
    <div id="game-progress">
      <progress id="progress" max={chars.length - 1} value={charsTyped}></progress>
      <p>{WPM} WPM</p>
    </div>  
  )
}

export default ProgressBar