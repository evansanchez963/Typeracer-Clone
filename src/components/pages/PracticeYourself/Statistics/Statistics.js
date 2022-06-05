import { SiSpeedtest } from "react-icons/si"
import { BiTimeFive, BiCheckCircle } from "react-icons/bi" 
import "./Statistics.css"

const Statistics = ({ userStats, getTime }) => {
  return (
    <div className="game-stats-container">

      <div className="stats-info">
        <p>Statistics:</p>
      </div>

      <div className="stat-container">
        <SiSpeedtest size={30}/>
        <div className="stat">
          <p>Speed:&nbsp;</p>
          <p>{userStats.finalWPM} WPM</p>
        </div>
      </div>

      <div className="stat-container">
        <BiTimeFive size={30}/>
        <div className="stat">
          <p>Time:&nbsp;</p>
          <p>{getTime(userStats.time)}</p>
        </div>
      </div>

      <div className="stat-container">
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