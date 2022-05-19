import { speedStat, timeStat, accuracyStat } from "../../../../images/index"
import "./Statistics.css"

const Statistics = ({ 
  isEnded,
  finalWPM,
  time,
  accuracy
}) => {
  return (
    <div id="game-stats" style={{display: isEnded ? "grid":"none"}}>

      <div id="stats-text">
        <p>Statistics:</p>
      </div>

      <div id="speed-stat">
        <img src={speedStat} alt="speed stat"></img>
        <div className="stat">
          <p>Your speed:</p>
          <p>{finalWPM} WPM</p>
        </div>
      </div>

      <div id="time-stat">
        <img src={timeStat} alt="time stat"></img>
        <div className="stat">
          <p>Time:</p>
          <p>0:{("0" + (Math.floor(time / 1000) % 60)).slice(-2)}</p>
        </div>
      </div>

      <div id="accuracy-stat">
        <img src={accuracyStat} alt="accuracy stat"></img>
        <div className="stat">
          <p>Accuracy:</p>
          <p>{accuracy}%</p>
        </div>
      </div>

    </div>
  )
}

export default Statistics