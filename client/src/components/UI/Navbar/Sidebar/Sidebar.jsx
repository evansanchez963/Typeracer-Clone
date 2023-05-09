import { Link } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import { IoClose } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { GiFullMotorcycleHelmet } from "react-icons/gi";
import "./Sidebar.css";

const Sidebar = ({ sidebarActive, onToggleSidebar }) => {
  const { isLoggedIn, userId, handleLogout } = useAuth();

  return (
    <div id="sidebar" className={sidebarActive ? "is-active" : ""}>
      <IoClose id="sidebar-close-btn" onClick={onToggleSidebar} size={30} />

      <div className="sidebar-icon-container">
        <FaUserCircle
          className="sidebar-icon"
          size={40}
          style={{ display: isLoggedIn ? "none" : "block" }}
        ></FaUserCircle>
        <GiFullMotorcycleHelmet
          className="sidebar-icon"
          size={40}
          style={{ display: isLoggedIn ? "block" : "none" }}
        ></GiFullMotorcycleHelmet>

        <div className="sidebar-icon-links">
          <Link
            to="/create-account"
            className="sidebar-icon-link"
            style={{ display: isLoggedIn ? "none" : "block" }}
            onClick={onToggleSidebar}
          >
            Create Account
          </Link>
          <Link
            to={`user/${userId}`}
            className="sidebar-icon-link"
            style={{ display: isLoggedIn ? "block" : "none" }}
            onClick={onToggleSidebar}
          >
            Account Settings
          </Link>
          <br></br>
          <Link
            to="/login"
            className="sidebar-icon-link"
            style={{ display: isLoggedIn ? "none" : "block" }}
            onClick={onToggleSidebar}
          >
            Sign In
          </Link>
          <Link
            to="/"
            className="sidebar-icon-link"
            style={{ display: isLoggedIn ? "block" : "none" }}
            onClick={() => {
              handleLogout();
              onToggleSidebar();
            }}
          >
            Log Out
          </Link>
        </div>
      </div>

      <div className="sidebar-link-container">
        <Link to="/">
          <div className="sidebar-link" onClick={onToggleSidebar}>
            <p>Home</p>
            <hr></hr>
          </div>
        </Link>

        <div className="sidebar-link">
          <a
            href="https://discord.com/invite/typeracer"
            target="_blank"
            rel="noreferrer noopener"
          >
            Discord
          </a>
          <hr></hr>
        </div>

        <Link to="/about">
          <div className="sidebar-link" onClick={onToggleSidebar}>
            <p>About</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
