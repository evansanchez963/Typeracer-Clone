import { Link } from "react-router-dom";
import "./ButtonRow.css";

const ButtonRow = ({ isEnded, restart }) => {
  return (
    <div className="practice-yourself-btn-row">
      <Link to="/">
        <button className="leave-practice">Main menu (leave practice)</button>
      </Link>
      <button
        className="new-race"
        style={{ display: isEnded ? "block" : "none" }}
        onClick={restart}
      >
        New race
      </button>
    </div>
  );
};

export default ButtonRow;
