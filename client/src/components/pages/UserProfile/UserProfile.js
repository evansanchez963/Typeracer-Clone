import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./UserProfile.css"

const UserProfile = ({ isLoggedIn }) => {

  const navigate = useNavigate()

  useEffect(() => {
    if(!isLoggedIn) navigate("/")
  }, [isLoggedIn, navigate])

  return (
    <section id="user-profile">

    <h1>Settings</h1>

      <div className="user-profile-container">
        <h1>Profile</h1>

        <h2>Name</h2>
        <h2>Email</h2>

        <button>Change Password</button>
      </div>

      <div className="user-stats-container">
        <h1>Average WPM: </h1>
        <h1>Highest WPM: </h1>
        <h1>Races: </h1>
      </div>

      <div className="danger-zone-container">
        <h1>Danger Zone</h1>

        <button>Delete Progress</button>
        <button>Delete Account</button>
      </div>

    </section>
  )
}

export default UserProfile