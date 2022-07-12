import "./UserInfo.css"

const UserInfo = ({ username, setUsername, email, setEmail }) => {
  const changeInfoHandler = (e) => {
    e.preventDefault()
  }

  const changePasswordHandler = (e) => {
    e.preventDefault()
  }

  return (
    <div className="user-profile-container">
      <h1>Profile</h1>

      <div className="user-personal-info">
        <h2>1. Personal Information (update info here)</h2>
        <hr></hr>
        <form id="user-info-form" onSubmit={changeInfoHandler}>
          <div className="user-info-input">
            <label htmlFor="user-info-username">Username:</label>
            <input type="text" id="user-info-username" name="user-info-username" onChange={(e) => setUsername(e.target.value)} value={username}></input>
          </div>
          <div className="user-info-input">
            <label htmlFor="user-info-email">Email:</label>
            <input type="text" id="user-info-email" name="user-info-email" onChange={(e) => setEmail(e.target.value)} value={email}></input>
          </div>
          <input type="submit" value="Submit" id="user-info-submit"></input>
        </form>
      </div>

      <div className="user-change-password">
        <h2>2. Change Password (optional)</h2>
        <hr></hr>
        <form id="user-password-form" onSubmit={changePasswordHandler}>
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
  )
}

export default UserInfo