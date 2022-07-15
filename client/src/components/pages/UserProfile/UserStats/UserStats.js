import { BsFillKeyboardFill } from "react-icons/bs";
import { SiSpeedtest } from "react-icons/si";
import { FaFlagCheckered } from "react-icons/fa";
import "./UserStats.css";

const UserStats = ({ avgWPM, highestWPM, raceCount }) => {
  return (
    <div className="user-stats-container">
      <div className="user-stats-info">
        <p>Statistics:</p>
      </div>

      <div className="user-stat-container">
        <BsFillKeyboardFill size={30} />
        <div className="user-stat">
          <p>Avg. WPM:&nbsp;</p>
          <p>{avgWPM} WPM</p>
        </div>
      </div>

      <div className="user-stat-container">
        <SiSpeedtest size={30} />
        <div className="user-stat">
          <p>Best Race:&nbsp;</p>
          <p>{highestWPM} WPM</p>
        </div>
      </div>

      <div className="user-stat-container">
        <FaFlagCheckered size={30} />
        <div className="user-stat">
          <p>Races:&nbsp;</p>
          <p>{raceCount} Races</p>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
