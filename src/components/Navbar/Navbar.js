import { useState } from "react"
import { Link } from "react-router-dom"
import { logo, menu } from "../../images/index"
import Sidebar from "./Sidebar/Sidebar"
import "./Navbar.css"

const Navbar = () => {
  const [sidebarActive, setSidebarActive] = useState(false)

  const toggleSidebar = () => setSidebarActive(prev => !prev)

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

      <img id="hamburger-menu" src={menu} alt="hamburger menu" onClick={toggleSidebar}></img>
      <Sidebar sidebarActive={sidebarActive} toggleSidebar={toggleSidebar}/>

    </nav>
  )
}   

export default Navbar