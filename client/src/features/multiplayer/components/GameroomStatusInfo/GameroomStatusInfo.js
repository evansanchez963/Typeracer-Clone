import "./GameroomStatusInfo.css";

const GameroomStatusInfo = () => {
  const getStatusMsg = () => {
    return <p>Waiting for players...</p>;
  };

  const getTimer = () => {
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
