import logo from "../images/logo.png"

const Navbar = () => {
  return (
    <nav id="navbar">
      <div id="links">
        <div id="logo">
          <img src={logo} alt="logo"></img>
          <p><strong>typeracer</strong></p>
        </div>
        <p>Discord</p>
        <p>About</p>
      </div>

      <div id="nav-button-row">
        <button>Create Account</button>
        <button>Sign In</button>
      </div>
    </nav>
  )
}   

export default Navbar