import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { logo } from "../../images/index"
import { GiFullMotorcycleHelmet } from "react-icons/gi"
import { GoGear } from "react-icons/go"
import { MdExitToApp } from "react-icons/md"
import { GoThreeBars } from "react-icons/go"
import Sidebar from "./Sidebar/Sidebar"
import "./Navbar.css"

const Navbar = ({ isLoggedIn, logoutHandler }) => {
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

      <div className="nav-btn-row" style={{display: isLoggedIn ? "none":"flex"}}>
        <div className="signup-info">Sign up to track your progress!</div>
        <Link to="/create-account"><button className="nav-btn">Create Account</button></Link>
        <Link to="/login"><button className="nav-btn">Sign In</button></Link>
      </div>

      <div className="nav-user-settings" style={{display: isLoggedIn ? "block":"none"}}>
        <GiFullMotorcycleHelmet size={30}/>
        <p>Username</p>
        <GoGear size={10}/>
        <MdExitToApp size={10} onClick={logoutHandler}/>
      </div>

      <GoThreeBars id="hamburger-menu" size={30} onClick={toggleSidebar}/>
      <Sidebar sidebarActive={sidebarActive} toggleSidebar={toggleSidebar} isLoggedIn={isLoggedIn} logoutHandler={logoutHandler}/>

    </nav>
  )
}   

export default Navbar