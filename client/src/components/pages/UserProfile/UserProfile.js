import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UserInfo, UserStats, DangerZone } from "./index"
import axios from "axios"
import "./UserProfile.css"

const UserProfile = ({ isLoggedIn, logoutHandler }) => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [avgWPM, setAvgWPM] = useState(0)
  const [highestWPM, setHighestWPM] = useState(0)
  const [raceCount, setRaceCount] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userObject = localStorage.getItem("userData")
      const user = JSON.parse(userObject)
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${ user.token }`
        }
      }

      try {
        const { data } = await axios.get(`/api/user/${user.userId}`, config)

        setUsername(data.username)
        setEmail(data.email)
      } catch {
        setUsername("Error")
        setEmail("Error")
      }
    }

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

    if(!isLoggedIn) navigate("/")
    else if(isLoggedIn) {
      fetchUserInfo()
      fetchUserStats()
    }
  }, [isLoggedIn, navigate])

  const resetUserStats = () => {
    setAvgWPM(0)
    setHighestWPM(0)
    setRaceCount(0)
  }

  return (
    <section id="user-profile">
      <UserInfo username={username} setUsername={setUsername} email={email} setEmail={setEmail} />
      <UserStats avgWPM={avgWPM} highestWPM={highestWPM} raceCount={raceCount}/>
      <DangerZone logoutHandler={logoutHandler} resetUserStats={resetUserStats}/>
    </section>
  )
}

export default UserProfile