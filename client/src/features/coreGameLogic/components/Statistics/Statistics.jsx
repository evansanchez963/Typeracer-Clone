import { useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { saveUserStats } from "../../../../services/userServices";
import { SiSpeedtest } from "react-icons/si";
import { BiTimeFive, BiCheckCircle } from "react-icons/bi";
import "./Statistics.css";

const Statistics = ({ WPM, time, accuracy }) => {
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const pushUserStats = async () => {
      try {
        await saveUserStats({ WPM, time, accuracy });
      } catch (err) {
        alert(err.message);
      }
    };

    if (isLoggedIn) pushUserStats();
  }, [isLoggedIn, WPM, time, accuracy]);

  return (
    <div className="game-stats-container">
      <div className="stats-info">
        <p>Statistics:</p>
      </div>

      <div className="stat-container">
        <SiSpeedtest size={30} />
        <div className="stat">
          <p>Speed:&nbsp;</p>
          <p>{WPM} WPM</p>
        </div>
      </div>

      <div className="stat-container">
        <BiTimeFive size={30} />
        <div className="stat">
          <p>Time:&nbsp;</p>
          <p>{time}</p>
        </div>
      </div>

      <div className="stat-container">
        <BiCheckCircle size={30} />
        <div className="stat">
          <p>Accuracy:&nbsp;</p>
          <p>{accuracy}%</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
