import axios from "axios"
import "./DangerZone.css"

const deleteProgressHandler = async (resetUserStats) => {
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
      await axios.post(
        `/api/user/${ user.userId }/restart`, 
        { arr: [] }, 
        config
      )
      resetUserStats()
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

const DangerZone = ({ logoutHandler, resetUserStats }) => {
  return (
    <div className="danger-zone-container">
      <h1>Danger Zone</h1>
      <button className="danger-option" onClick={() => deleteProgressHandler(resetUserStats)}>Delete Progress</button>
      <button className="danger-option" onClick={() => deleteAccountHandler(logoutHandler)}>Delete Account</button>
    </div>
  )
}

export default DangerZone