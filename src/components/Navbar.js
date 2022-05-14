import { Link } from "react-router-dom"
import logo from "../images/logo.png"

const Navbar = () => {
  return (
    <nav id="navbar">

      <div id="links">
        <div id="logo">
          <img src={logo} alt="logo"></img>
          <Link to="/"><strong>typeracer</strong></Link>
        </div>
        <a href="https://discord.com/invite/typeracer" target="_blank" rel="noreferrer noopener">Discord</a>
        <Link to="/about">About</Link>
      </div>

      <div id="nav-button-row">
        <button>Create Account</button>
        <button>Sign In</button>
      </div>

    </nav>
  )
}   

export default Navbar