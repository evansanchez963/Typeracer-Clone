import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { BsFillKeyboardFill } from "react-icons/bs"
import { SiSpeedtest } from "react-icons/si"
import { FaFlagCheckered } from "react-icons/fa"
import "./UserProfile.css"

const UserProfile = ({ isLoggedIn }) => {

  const [avgWPM, setAvgWPM] = useState(0)
  const [highestWPM, setHighestWMP] = useState(0)
  const [raceCount, setRaceCount] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    if(!isLoggedIn) navigate("/")
  }, [isLoggedIn, navigate])

  return (
    <section id="user-profile">

      <div className="user-profile-container">
        <h1>Profile</h1>

        <h2>Name</h2>
        <h2>Email</h2>

        <button>Change Password</button>
      </div>

      <div className="user-stats-container">
        <div className="user-stats-info">
          <p>Statistics:</p>
        </div>

        <div className="user-stat-container">
          <BsFillKeyboardFill size={30}/>
          <div className="user-stat">
            <p>Average WPM:&nbsp;</p>
            <p>{avgWPM} WPM</p>
          </div>
        </div>

        <div className="user-stat-container">
          <SiSpeedtest size={30}/>
          <div className="user-stat">
            <p>Highest WPM:&nbsp;</p>
            <p>{highestWPM} WPM</p>
          </div>
        </div>

        <div className="user-stat-container">
          <FaFlagCheckered size={30}/>
          <div className="user-stat">
            <p>Races:&nbsp;</p>
            <p>{raceCount} Races</p>
          </div>
        </div>
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