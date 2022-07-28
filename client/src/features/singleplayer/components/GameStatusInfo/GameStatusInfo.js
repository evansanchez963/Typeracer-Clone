import formatTime from "../../utils/formatTime";
import "./GameStatusInfo.css";

const GameStatusInfo = ({ gameStatus, timers }) => {
  const getStatusMsg = () => {
    if (!gameStatus.isStarted) return <p>The race is about to start...</p>;
    else if (gameStatus.isEnded) return <p>The race has ended!</p>;
    else return <p>The race has started!</p>;
  };

  const getTimer = () => {
    if (timers.countdownOn) return <p>{formatTime(timers.countdown)}</p>;
    else if (timers.gameTimerOn) return <p>{formatTime(timers.gameTimer)}</p>;
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
