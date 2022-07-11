import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UserInfo, UserStats, DangerZone } from "./index"
import "./UserProfile.css"

const UserProfile = ({ isLoggedIn }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if(!isLoggedIn) navigate("/")
  }, [isLoggedIn, navigate])

  return (
    <section id="user-profile">
      <UserInfo isLoggedIn={isLoggedIn}></UserInfo>
      <UserStats isLoggedIn={isLoggedIn}></UserStats>
      <DangerZone isLoggedIn={isLoggedIn}></DangerZone>
    </section>
  )
}

export default UserProfile