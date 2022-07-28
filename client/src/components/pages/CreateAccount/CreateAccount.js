import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth, useLogin } from "../../../context/AuthContext";
import axios from "axios";
import "./CreateAccount.css";

const CreateAccount = () => {
  const isLoggedIn = useAuth();
  const loginHandler = useLogin();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  const createAccountHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      username,
      password,
    };
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword)
      return setError("Passwords do not match!");

    try {
      const { data } = await axios.post(
        "/api/auth/createaccount",
        userData,
        config
      );

      // If successful, log in user.
      loginHandler(data.token, data.id);
    } catch (err) {
      // Display error in form.
      setError(err.response.data.error);
    }
  };

  return (
    <section id="create-account">
      <div className="ca-form-container">
        <h1>Create Account</h1>

        <div className="ca-form-wrapper">
          {error && <span className="ca-error-message">*{error}</span>}

          <form id="ca-form" onSubmit={createAccountHandler}>
            <div className="ca-form-input">
              <label htmlFor="ca-username">Username:</label>
              <input
                type="text"
                id="ca-username"
                name="ca-username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
              ></input>
            </div>

            <div className="ca-form-input">
              <label htmlFor="ca-email">Email:</label>
              <input
                type="email"
                id="ca-email"
                name="ca-email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              ></input>
            </div>

            <div className="ca-form-input">
              <label htmlFor="ca-password">Password:</label>
              <input
                type="password"
                id="ca-password"
                name="ca-password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              ></input>
            </div>

            <div className="ca-form-input">
              <label htmlFor="ca-confirm-password">Confirm Password:</label>
              <input
                type="password"
                id="ca-confirm-password"
                name="ca-confirm-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
              ></input>
            </div>

            <input type="submit" value="Sign up!" id="ca-signup-btn"></input>

            <span className="ca-subtext">
              Already have an account? <Link to="/login">Login</Link>
            </span>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateAccount;
