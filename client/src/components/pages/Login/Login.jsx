import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { loginUser } from "../../../services/authServices";
import "./Login.css";

const Login = () => {
  const { isLoggedIn, handleLogin } = useAuth();
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const loginFormHandler = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(loginForm);
      handleLogin(data.token, data.id);
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
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
              <input
                type="text"
                id="login-username"
                name="username"
                onChange={handleChange}
                required
              ></input>
            </div>

            <div className="login-form-input">
              <label htmlFor="login-password">Password:</label>
              <input
                type="password"
                id="login-password"
                name="password"
                onChange={handleChange}
                required
              ></input>
            </div>

            <input type="submit" value="Log In" id="login-signup-btn"></input>

            <span className="login-subtext">
              Don't have an account?{" "}
              <Link to="/create-account">Create an Account</Link>
            </span>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
