import "./CreateAccount.css"

const CreateAccount = () => {
  return (
    <section id="create-account">

      <div className="ca-form-container">

        <h1>Create Account</h1>

        <form id="ca-form" method="POST">

          <div className="ca-form-input">
            <label htmlFor="ca-username">Username:</label>
            <input type="text" id="ca-username" name="ca-username" required></input>
          </div>

          <div className="ca-form-input">
            <label htmlFor="ca-email">Email:</label>
            <input type="email" id="ca-email" name="ca-email" required></input>
          </div>

          <div className="ca-form-input">
            <label htmlFor="ca-password">Password:</label>
            <input type="password" id="ca-password" name="ca-password" required></input>
          </div>

          <div className="ca-form-input">
            <label htmlFor="ca-confirm-password">Confirm Password:</label>
            <input type="password" id="ca-confirm-password" name="ca-confirm-password" required></input>
          </div>

          <input type="submit" value="Sign up!" id="ca-signup-btn"></input>

        </form>
      </div>

    </section>
  )
}

export default CreateAccount