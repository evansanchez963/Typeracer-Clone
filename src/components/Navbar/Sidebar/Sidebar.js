import { IoClose } from "react-icons/io5" 
import "./Sidebar.css"

const Sidebar = ({ sidebarActive, toggleSidebar }) => {
  return (
    <div id="sidebar" className={sidebarActive ? "is-active":""}>
      <IoClose id="sidebar-close" onClick={toggleSidebar} size={30}/>
    </div>
  )
}

export default Sidebar