import { Link } from "react-router-dom"
import { logo, menu } from "../../images/index"
import "./Navbar.css"

const Navbar = () => {
  return (
    <nav id="navbar">

      <div id="links">
        <div id="logo">
          <img src={logo} alt="logo"></img>
          <Link to="/"><strong>typeracer</strong></Link>
        </div>
        <a id="discord-link" href="https://discord.com/invite/typeracer" target="_blank" rel="noreferrer noopener">Discord</a>
        <Link id="about-link" to="/about">About</Link>
      </div>

      <div id="nav-button-row">
        <button>Create Account</button>
        <button>Sign In</button>
      </div>

      <img id="hamburger-menu" src={menu} alt="hamburger menu"></img>

    </nav>
  )
}   

export default Navbar