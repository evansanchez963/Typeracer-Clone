import { Link } from "react-router-dom";
import { startLine, typing } from "../../../assets/index";
import "./Homepage.css";

const Homepage = () => {
  return (
    <section id="homepage">
      <div>
        <h1>typeracer - the Global Typing Competition</h1>
        <p>Increase your typing speed while racing against others.</p>
      </div>

      <div className="game-mode-container">
        <div className="gamemode">
          <div className="gamemode-info">
            <p>Get matched up with online opponents</p>
            <Link to="/play-online">
              <button id="play-online-btn" className="gamemode-btn">
                Play Online
              </button>
            </Link>
          </div>

          <img className="gamemode-img" src={startLine} alt="start line"></img>
        </div>

        <div className="gamemode">
          <div className="gamemode-info">
            <p>Improve your typing skills on your own</p>
            <Link to="/practice-yourself">
              <button id="play-yourself-btn" className="gamemode-btn">
                Practice Yourself
              </button>
            </Link>
          </div>

          <img className="gamemode-img" src={typing} alt="typing"></img>
        </div>
      </div>
    </section>
  );
};

export default Homepage;
