import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { BsFillKeyboardFill } from "react-icons/bs"
import { GoThreeBars } from "react-icons/go"
import Sidebar from "./Sidebar/Sidebar"
import "./Navbar.css"

const Navbar = () => {
  const [sidebarActive, setSidebarActive] = useState(false)

  const toggleSidebar = () => setSidebarActive(prev => !prev)

  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth > 1000) setSidebarActive(false)
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <nav id="navbar">

      <div id="links">
        <div id="logo">
          <BsFillKeyboardFill size={40}/>
          <Link id="logo-link" to="/"><strong>typeracer</strong></Link>
        </div>
        <a className="nav-link" href="https://discord.com/invite/typeracer" target="_blank" rel="noreferrer noopener">Discord</a>
        <Link className="nav-link" to="/about">About</Link>
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