import { speedStat, timeStat, accuracyStat } from "../../../../images/index"
import "./Statistics.css"

const Statistics = ({ isEnded }) => {
  return (
    <div id="game-stats" style={{display: isEnded ? "grid":"none"}}>

      <div id="stats-text">
        <p>Statistics:</p>
      </div>

      <div id="speed-stat">
        <img src={speedStat} alt="speed stat"></img>
        <div className="stat">
          <p>Your speed:</p>
          <p>0wpm</p>
        </div>
      </div>

      <div id="time-stat">
        <img src={timeStat} alt="time stat"></img>
        <div className="stat">
          <p>Time:</p>
          <p>0:00</p>
        </div>
      </div>

      <div id="accuracy-stat">
        <img src={accuracyStat} alt="accuracy stat"></img>
        <div className="stat">
          <p>Accuracy:</p>
          <p>0%</p>
        </div>
      </div>

    </div>
  )
}

export default Statistics