import { SiSpeedtest } from "react-icons/si"
import { BiTimeFive, BiCheckCircle } from "react-icons/bi" 
import "./Statistics.css"

const Statistics = ({ userStats, getTime }) => {
  return (
    <div id="game-stats">

      <div id="stats-text">
        <p>Statistics:</p>
      </div>

      <div id="speed-stat">
        <SiSpeedtest size={30}/>
        <div className="stat">
          <p>Speed:&nbsp;</p>
          <p>{userStats.finalWPM} WPM</p>
        </div>
      </div>

      <div id="time-stat">
        <BiTimeFive size={30}/>
        <div className="stat">
          <p>Time:&nbsp;</p>
          <p>{getTime(userStats.time)}</p>
        </div>
      </div>

      <div id="accuracy-stat">
        <BiCheckCircle size={30}/>
        <div className="stat">
          <p>Accuracy:&nbsp;</p>
          <p>{userStats.accuracy}%</p>
        </div>
      </div>

    </div>
  )
}

export default Statistics