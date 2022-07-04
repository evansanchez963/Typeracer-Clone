import { Link, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import "./CreateAccount.css"

const CreateAccount = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const createAccountHandler = async (e) => {
    e.preventDefault()

    const userData = {
      email: email,
      username: username,
      password: password
    }

    if(password !== confirmPassword) return setError("Passwords do not match!")

    const response = await fetch(
      "http://localhost:5000/api/auth/createaccount",
      { 
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(userData)
      }
    )

    if(!response.ok) {
      setError(response.statusText)
      return
    }

    const responseJSON = await response.json()

    if(responseJSON.hasOwnProperty("error")) {
      setError(responseJSON.error)
      return
    }

    localStorage.setItem("authToken", responseJSON.token)

    setIsLoggedIn(true)
    return
  }

  useEffect(() => {
    if(localStorage.getItem("authToken")) {
      setIsLoggedIn(true)
    }
  }, [isLoggedIn])

  if(isLoggedIn) {
    return <Navigate to="/"/>
  }
  return (
    <section id="create-account">

      <div className="ca-form-container">

        <h1>Create Account</h1>

        {error && <span className="ca-error-message">*{error}</span>}

        <form id="ca-form" onSubmit={createAccountHandler}>

          <div className="ca-form-input">
            <label htmlFor="ca-username">Username:</label>
            <input type="text" id="ca-username" name="ca-username" onChange={(e) => setUsername(e.target.value)} required></input>
          </div>

          <div className="ca-form-input">
            <label htmlFor="ca-email">Email:</label>
            <input type="email" id="ca-email" name="ca-email" onChange={(e) => setEmail(e.target.value)} required></input>
          </div>

          <div className="ca-form-input">
            <label htmlFor="ca-password">Password:</label>
            <input type="password" id="ca-password" name="ca-password" onChange={(e) => setPassword(e.target.value)} required></input>
          </div>

          <div className="ca-form-input">
            <label htmlFor="ca-confirm-password">Confirm Password:</label>
            <input type="password" id="ca-confirm-password" name="ca-confirm-password" onChange={(e) => setConfirmPassword(e.target.value)} required></input>
          </div>

          <input type="submit" value="Sign up!" id="ca-signup-btn"></input>

          <span className="ca-subtext">Already have an account? <Link to="/login">Login</Link></span>

        </form>
      </div>

    </section>
  )

}

export default CreateAccount