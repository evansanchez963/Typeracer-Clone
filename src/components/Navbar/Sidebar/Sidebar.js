import "./Sidebar.css"

const Sidebar = ({ sidebarActive, toggleSidebar }) => {
  return (
    <div id="sidebar" className={sidebarActive ? "is-active":""}>
      <button onClick={toggleSidebar}>X</button>
    </div>
  )
}

export default Sidebar