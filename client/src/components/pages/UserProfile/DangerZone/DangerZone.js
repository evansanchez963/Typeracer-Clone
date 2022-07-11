import "./DangerZone.css"

const DangerZone = ({ isLoggedIn }) => {
  return (
    <div className="danger-zone-container">
      <h1>Danger Zone</h1>
      <button className="danger-option">Delete Progress</button>
      <button className="danger-option">Delete Account</button>
    </div>
  )
}

export default DangerZone