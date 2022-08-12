import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ButtonRow.css";

const ButtonRow = ({ isClientEnded }) => {
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    if (!isClientEnded) setIsWaiting(false);
  }, [isClientEnded]);

  return (
    <div className="gameroom-btn-row">
      <Link to="/">
        <button className="leave-room">Main menu (leave room)</button>
      </Link>
      <button
        className={isWaiting ? "restart-waiting" : "restart-ready"}
        style={{ display: isClientEnded ? "block" : "none" }}
        onClick={() => setIsWaiting(true)}
      >
        {isWaiting ? "Waiting..." : "Restart?"}
      </button>
    </div>
  );
};

export default ButtonRow;
