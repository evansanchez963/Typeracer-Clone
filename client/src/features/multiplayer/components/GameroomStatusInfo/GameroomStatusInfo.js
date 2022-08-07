import "./GameroomStatusInfo.css";
import "../../utils/formatTime";
import formatTime from "../../utils/formatTime";

const GameroomStatusInfo = ({ roomStatus, clientStatus, timers }) => {
  const getStatusMsg = () => {
    if (!roomStatus.isRoomStarted) return <p>Waiting for players...</p>;
    else if (!clientStatus.isClientStarted)
      return <p>The race is about to start...</p>;
    else if (roomStatus.isRoom) return <p>The race has ended!</p>;
    else return <p>The race has started!</p>;
  };

  const getTimer = () => {
    if (timers.countdownOn) return <p>{formatTime(timers.countdown)}</p>;
    else if (timers.gameTimerOn) return <p>{formatTime(timers.gameTimer)}</p>;
    return <p>00:00</p>;
  };

  return (
    <div className="gameroom-status-info">
      {getStatusMsg()}
      {getTimer()}
    </div>
  );
};

export default GameroomStatusInfo;
