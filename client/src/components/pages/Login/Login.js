import "./Login.css"

const Login = () => {
  return (
    <section id="login">

      <div className="login-form-container">

        <h1>Log In</h1>

        <form id="login-form" method="GET">

          <div className="login-form-input">
            <label htmlFor="login-username">Username:</label>
            <input type="text" id="login-username" name="login-username" required></input>
          </div>

          <div className="login-form-input">
            <label htmlFor="login-password">Password:</label>
            <input type="password" id="login-password" name="login-password" required></input>
          </div>

          <input type="submit" value="Log In" id="login-signup-btn"></input>

        </form>

      </div>

    </section>
  )
}

export default Login