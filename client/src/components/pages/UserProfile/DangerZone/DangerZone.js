import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./DangerZone.css"

const deleteProgressHandler = async (navigate) => {
  if(window.confirm("Are you sure you want to delete your progress?")) {
    const userObject = localStorage.getItem("userData")
    const user = JSON.parse(userObject)
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ user.token }`
      }
    }

    try {
      await axios.post(`/api/user/${ user.userId }/restart`, config)
      navigate(`/user/${ user.userId }`)
    } catch (err) {
      alert(err.message)
    }
  }
}

const deleteAccountHandler = async (logoutHandler) => {
  if(window.confirm("Are you sure you want to delete your account?")) {
    const userObject = localStorage.getItem("userData")
    const user = JSON.parse(userObject)
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ user.token }`
      }
    }

    try {
      await axios.delete(`/api/user/${ user.userId }/delete`, config)
      logoutHandler()
    } catch (err) {
      alert(err.message)
    }
  }
}

const DangerZone = ({ logoutHandler }) => {

  const navigate = useNavigate()

  return (
    <div className="danger-zone-container">
      <h1>Danger Zone</h1>
      <button className="danger-option" onClick={() => deleteProgressHandler(navigate)}>Delete Progress</button>
      <button className="danger-option" onClick={() => deleteAccountHandler(logoutHandler)}>Delete Account</button>
    </div>
  )
}

export default DangerZone