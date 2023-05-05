import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { createNewAccount } from "../../../services/authServices";
import "./CreateAccount.css";

const CreateAccount = () => {
  const { isLoggedIn, handleLogin } = useAuth();
  const [createAccountForm, setCreateAccountForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCreateAccountForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const createAccountHandler = async (e) => {
    e.preventDefault();

    if (createAccountForm.password !== createAccountForm.confirmPassword)
      return setError("Passwords do not match!");

    try {
      const data = await createNewAccount(createAccountForm);

      // If successful, log in user.
      handleLogin(data.token, data.id);
    } catch (err) {
      // Display error in form.
      setError(err.response.data.error);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
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
                name="username"
                onChange={handleChange}
                required
              ></input>
            </div>

            <div className="ca-form-input">
              <label htmlFor="ca-email">Email:</label>
              <input
                type="email"
                id="ca-email"
                name="email"
                onChange={handleChange}
                required
              ></input>
            </div>

            <div className="ca-form-input">
              <label htmlFor="ca-password">Password:</label>
              <input
                type="password"
                id="ca-password"
                name="password"
                onChange={handleChange}
                required
              ></input>
            </div>

            <div className="ca-form-input">
              <label htmlFor="ca-confirm-password">Confirm Password:</label>
              <input
                type="password"
                id="ca-confirm-password"
                name="confirmPassword"
                onChange={handleChange}
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
