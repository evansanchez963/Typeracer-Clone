import { Link } from "react-router-dom"
import { IoClose } from "react-icons/io5" 
import { FaUserCircle } from "react-icons/fa"
import "./Sidebar.css"

const Sidebar = ({ sidebarActive, toggleSidebar }) => {
  return (
    <div id="sidebar" className={sidebarActive ? "is-active":""}>
      <IoClose id="sidebar-close-btn" onClick={toggleSidebar} size={30}/>

      <div className="sidebar-icon-container">
        <FaUserCircle id="sidebar-user-icon" size={40}></FaUserCircle>
        <div className="sidebar-icon-links">
          <Link to="/create-account" className="sidebar-icon-link" onClick={toggleSidebar}>Create Account</Link> 
          <br></br>
          <Link to="/login" className="sidebar-icon-link" onClick={toggleSidebar}>Sign In</Link>
        </div>
      </div>

      <div className="sidebar-link-container">

        <Link to="/">
          <div className="sidebar-link" onClick={toggleSidebar}>
            <p>Home</p>
            <hr></hr>
          </div>
        </Link>

        <div className="sidebar-link">
          <a href="https://discord.com/invite/typeracer" target="_blank" rel="noreferrer noopener">Discord</a>
          <hr></hr>
        </div>

        <Link to="/about">
          <div className="sidebar-link" onClick={toggleSidebar}>
            <p>About</p>
          </div>
        </Link>

      </div>
    </div>
  )
}

export default Sidebar