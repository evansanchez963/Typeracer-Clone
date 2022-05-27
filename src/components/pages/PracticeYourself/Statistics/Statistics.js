import { speedStat, timeStat, accuracyStat } from "../../../../images/index"
import "./Statistics.css"

const Statistics = ({ userStats, getTime }) => {
  return (
    <div id="game-stats">

      <div id="stats-text">
        <p>Statistics:</p>
      </div>

      <div id="speed-stat">
        <img src={speedStat} alt="speed stat"></img>
        <div className="stat">
          <p>Speed:&nbsp;</p>
          <p>{userStats.finalWPM} WPM</p>
        </div>
      </div>

      <div id="time-stat">
        <img src={timeStat} alt="time stat"></img>
        <div className="stat">
          <p>Time:&nbsp;</p>
          <p>{getTime(userStats.time)}</p>
        </div>
      </div>

      <div id="accuracy-stat">
        <img src={accuracyStat} alt="accuracy stat"></img>
        <div className="stat">
          <p>Accuracy:&nbsp;</p>
          <p>{userStats.accuracy}%</p>
        </div>
      </div>

    </div>
  )
}

export default Statistics