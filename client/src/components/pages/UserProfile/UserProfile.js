import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UserInfo, UserStats, DangerZone } from "./index"
import "./UserProfile.css"

const UserProfile = ({ isLoggedIn, logoutHandler }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if(!isLoggedIn) navigate("/")
  }, [isLoggedIn, navigate])

  return (
    <section id="user-profile">
      <UserInfo isLoggedIn={isLoggedIn}/>
      <UserStats isLoggedIn={isLoggedIn}/>
      <DangerZone logoutHandler={logoutHandler}/>
    </section>
  )
}

export default UserProfile