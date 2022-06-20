import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { logo } from "../../images/index"
import { GoThreeBars } from "react-icons/go"
import Sidebar from "./Sidebar/Sidebar"
import "./Navbar.css"

const Navbar = () => {
  const [sidebarActive, setSidebarActive] = useState(false)

  const toggleSidebar = () => setSidebarActive(prev => !prev)

  // Close sidebar when not needed anymore.
  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth > 1000) setSidebarActive(false)
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <nav id="navbar">

      <div className="nav-links-container">
        <div id="logo">
          <img src={logo} alt="typeracer logo"></img>
          <Link className="logo-link" to="/"><strong>typeracer</strong></Link>
        </div>
        <a className="nav-link" href="https://discord.com/invite/typeracer" target="_blank" rel="noreferrer noopener">Discord</a>
        <Link className="nav-link" to="/about">About</Link>
      </div>

      <div className="nav-btn-row">
        <div className="signup-info">Sign up to track progress and play against others!</div>
        <button>Create Account</button>
        <button>Sign In</button>
      </div>

      <GoThreeBars id="hamburger-menu" size={30} onClick={toggleSidebar}/>
      <Sidebar sidebarActive={sidebarActive} toggleSidebar={toggleSidebar}/>

    </nav>
  )
}   

export default Navbar