import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { BsFillKeyboardFill } from "react-icons/bs"
import { SiSpeedtest } from "react-icons/si"
import { FaFlagCheckered } from "react-icons/fa"
import "./UserProfile.css"

const UserProfile = ({ isLoggedIn }) => {

  const [avgWPM, setAvgWPM] = useState(0)
  const [highestWPM, setHighestWPM] = useState(0)
  const [raceCount, setRaceCount] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    if(!isLoggedIn) navigate("/")
  }, [isLoggedIn, navigate])

  return (
    <section id="user-profile">

      <div className="user-profile-container">
        <h1>Profile</h1>

        <div className="user-personal-info">
          <h2>1. Personal Information</h2>
          <hr></hr>
          <form id="user-info-form">
            <div className="user-info-input">
              <label htmlFor="user-info-username">Username:</label>
              <input type="text" id="user-info-username" name="user-info-username"></input>
            </div>
            <div className="user-info-input">
              <label htmlFor="user-info-email">Email:</label>
              <input type="text" id="user-info-email" name="user-info-email"></input>
            </div>
            <input type="submit" value="Submit" id="user-info-submit"></input>
          </form>
        </div>

        <div className="user-change-password">
          <h2>2. Change Password (optional)</h2>
          <hr></hr>
          <form id="user-password-form">
            <div className="user-password-input">
              <label htmlFor="user-password">Password:</label>
              <input type="text" id="user-password" name="user-password"></input>
            </div>
            <div className="user-password-input">
              <label htmlFor="user-confirm-password">Confirm Password:</label>
              <input type="text" id="user-confirm-password" name="user-confirm-password"></input>
            </div>
            <input type="submit" value="Submit" id="user-password-submit"></input>
          </form>
        </div>
      </div>

      <div className="user-stats-container">
        <div className="user-stats-info">
          <p>Statistics:</p>
        </div>

        <div className="user-stat-container">
          <BsFillKeyboardFill size={30}/>
          <div className="user-stat">
            <p>Avg. WPM:&nbsp;</p>
            <p>{avgWPM} WPM</p>
          </div>
        </div>

        <div className="user-stat-container">
          <SiSpeedtest size={30}/>
          <div className="user-stat">
            <p>Best Race:&nbsp;</p>
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