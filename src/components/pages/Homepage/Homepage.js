import { Link } from "react-router-dom" 
import { startLine, typing } from "../../../images/index" 
import "./Homepage.css"

const Homepage = () => {
  return (
    <section id="homepage">

      <div id="text">
        <h1>typeracer - the Global Typing Competition</h1>
        <p>Increase your typing speed while racing against others.</p>
      </div>

      <div id="game-modes">
        <div id="race-online">
          <div id="online-text">
            <p>Get matched up with online opponents</p>
            <button>Under construction</button>
          </div>

          <img id="start-line" src={startLine} alt="start line"></img>
        </div>

        <div id="race-alone">
          <div id="alone-text">
            <p>Improve your typing skills on your own</p>
            <Link to="/practice-yourself">
              <button>Practice Yourself</button>
            </Link>
          </div>

          <img id="typing" src={typing} alt="typing"></img>
        </div>
      </div>

    </section>
  )
}

export default Homepage