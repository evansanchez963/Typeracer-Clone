import { formatTime } from "../../../coreGameLogic/utils/index";
import "./GameStatusInfo.css";

const GameStatusInfo = ({ gameStatus, countdownTimer, gameTimer }) => {
  const getStatusMsg = () => {
    if (gameStatus === "not_started")
      return <p>The race is about to start...</p>;
    else if (gameStatus === "ended") return <p>The race has ended!</p>;
    else return <p>The race has started!</p>;
  };

  const getTimer = () => {
    if (countdownTimer > 0) return <p>{formatTime(countdownTimer)}</p>;
    else if (gameTimer > 0) return <p>{formatTime(gameTimer)}</p>;
    else return <p>00:00</p>;
  };

  return (
    <div className="game-status-info">
      {getStatusMsg()}
      {getTimer()}
    </div>
  );
};

export default GameStatusInfo;
