import "./DangerZone.css"

const deleteProgressHandler = () => {
  if(window.confirm("Are you sure you want to delete your progress?")) {
    alert("Progress deleted!")
  }
}

const deleteAccountHandler = () => {
  if(window.confirm("Are you sure you want to delete your account?")) {
    alert("Account deleted!")
  }
}

const DangerZone = ({ isLoggedIn }) => {
  return (
    <div className="danger-zone-container">
      <h1>Danger Zone</h1>
      <button className="danger-option" onClick={deleteProgressHandler}>Delete Progress</button>
      <button className="danger-option" onClick={deleteAccountHandler}>Delete Account</button>
    </div>
  )
}

export default DangerZone