import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import "./Login.css"

const Login = ({ isLoggedIn, loginHandler }) => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    if(isLoggedIn) navigate("/")
  }, [isLoggedIn, navigate])

  const loginFormHandler = async (e) => {
    e.preventDefault()

    const userData = { username, password }
    const config = { 
      header: {
        "Content-Type":"application/json"
      }
    }
   
    try {
      const { data } = await axios.post(
        "api/auth/login",
        userData,
        config
      )
  
      // If successful, log in user.
      loginHandler(data.token, data.id)
      navigate("/")
    } catch (err) {
      // Display error in form.
      setError(err.response.data.error)
    }
  }

  return (
    <section id="login">

      <div className="login-form-container">

        <h1>Log In</h1>

          <div className="login-form-wrapper">
            {error && <span className="login-error-message">*{error}</span>}

            <form id="login-form" onSubmit={loginFormHandler}>

              <div className="login-form-input">
                <label htmlFor="login-username">Username:</label>
                <input type="text" id="login-username" name="login-username" onChange={(e) => setUsername(e.target.value)} value={username} required></input>
              </div>

              <div className="login-form-input">
                <label htmlFor="login-password">Password:</label>
                <input type="password" id="login-password" name="login-password" onChange={(e) => setPassword(e.target.value)} value={password} required></input>
              </div>

              <input type="submit" value="Log In" id="login-signup-btn"></input>

              <span className="login-subtext">Don't have an account? <Link to="/create-account">Create an Account</Link></span>

            </form>
          </div>

      </div>

    </section>
  )

}

export default Login