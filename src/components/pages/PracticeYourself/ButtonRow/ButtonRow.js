import { Link } from "react-router-dom"
import "./ButtonRow.css"

const ButtonRow = ({isEnded}) => {
  return (
    <div id="practice-yourself-button-row">
      <Link to="/">
        <button id="leave-practice">Main menu (leave practice)</button>
      </Link>
      <button id="new-race" style={{display: isEnded ? "block":"none"}} onClick={() => window.location.reload()}>New race</button>
    </div>
  )
}

export default ButtonRow