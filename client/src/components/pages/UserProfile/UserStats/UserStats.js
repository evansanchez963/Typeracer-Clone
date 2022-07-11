import { useState, useEffect } from "react"
import { BsFillKeyboardFill } from "react-icons/bs"
import { SiSpeedtest } from "react-icons/si"
import { FaFlagCheckered } from "react-icons/fa"
import axios from "axios"
import "./UserStats.css"

const UserStats = ({ isLoggedIn }) => {
  const [avgWPM, setAvgWPM] = useState(0)
  const [highestWPM, setHighestWPM] = useState(0)
  const [raceCount, setRaceCount] = useState(0)

  useEffect(() => {
    const fetchUserStats = async () => {
      const userObject = localStorage.getItem("userData")
      const user = JSON.parse(userObject)
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        }
      }
  
      try {
        const { data } = await axios.get(`/api/user/${user.userId}/stats`, config)
  
        setAvgWPM(data.avgWPM)
        setHighestWPM(data.highestWPM)
        setRaceCount(data.raceCount)
      } catch {
        setAvgWPM("Error")
        setHighestWPM("Error")
        setRaceCount("Error")
      }
    }

    if(isLoggedIn) fetchUserStats()
  }, [isLoggedIn])

  return (
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
  )
}

export default UserStats