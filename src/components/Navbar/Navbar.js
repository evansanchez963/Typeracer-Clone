import { useState } from "react"
import { Link } from "react-router-dom"
import { BsFillKeyboardFill } from "react-icons/bs"
import { GoThreeBars } from "react-icons/go"
import Sidebar from "./Sidebar/Sidebar"
import "./Navbar.css"

const Navbar = () => {
  const [sidebarActive, setSidebarActive] = useState(false)

  const toggleSidebar = () => setSidebarActive(prev => !prev)

  return (
    <nav id="navbar">

      <div id="links">
        <div id="logo">
          <BsFillKeyboardFill size={40}/>
          <Link to="/"><strong>typeracer</strong></Link>
        </div>
        <a id="discord-link" href="https://discord.com/invite/typeracer" target="_blank" rel="noreferrer noopener">Discord</a>
        <Link id="about-link" to="/about">About</Link>
      </div>

      <div id="nav-button-row">
        <button>Create Account</button>
        <button>Sign In</button>
      </div>

      <GoThreeBars id="hamburger-menu" size={30} onClick={toggleSidebar}/>
      <Sidebar sidebarActive={sidebarActive} toggleSidebar={toggleSidebar}/>

    </nav>
  )
}   

export default Navbar