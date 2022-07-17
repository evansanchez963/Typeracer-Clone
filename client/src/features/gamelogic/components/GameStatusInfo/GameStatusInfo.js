import "./GameStatusInfo.css";

const GameStatusInfo = ({ gameStatus, countdown, gameTimer, formatTime }) => {
  const getStatusMsg = () => {
    if (!gameStatus.isStarted) return <p>The race is about to start...</p>;
    else if (gameStatus.isEnded) return <p>The race has ended!</p>;
    else return <p>The race has started!</p>;
  };

  const getTimer = () => {
    if (countdown.on) return <p>{formatTime(countdown.time)}</p>;
    else if (gameTimer.on) return <p>{formatTime(gameTimer.time)}</p>;
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
