import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = React.createContext();
const UserIdContext = React.createContext();
const UsernameContext = React.createContext();
const LoginContext = React.createContext();
const LogoutContext = React.createContext();

// Custom hooks to be used in other parts of the application.
const useAuth = () => {
  return useContext(AuthContext);
};

const useUserId = () => {
  return useContext(UserIdContext);
};

const useUsername = () => {
  return useContext(UsernameContext);
};

const useLogin = () => {
  return useContext(LoginContext);
};

const useLogout = () => {
  return useContext(LogoutContext);
};

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // Check if a user was last logged in by checking local storage.
  useEffect(() => {
    const lastLoggedIn = localStorage.getItem("userData");
    if (lastLoggedIn) {
      const userObject = JSON.parse(lastLoggedIn);
      setUserId(userObject.id);
      setIsLoggedIn(true);
    }
  }, []);

  // Get username from userId.
  useEffect(() => {
    const getUsername = async () => {
      const userObject = localStorage.getItem("userData");
      const user = JSON.parse(userObject);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      try {
        const { data } = await axios.get(`/api/user/${user.userId}`, config);
        setUsername(data.username);
      } catch {
        setUsername("Error");
      }
    };

    if (isLoggedIn) getUsername();
  }, [isLoggedIn]);

  const loginHandler = (token, userId) => {
    const userObject = {
      userId: userId,
      token: token,
    };
    localStorage.setItem("userData", JSON.stringify(userObject));
    setUserId(userObject.userId);
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("userData");
    setUserId("");
    setUsername("");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={isLoggedIn}>
      <UserIdContext.Provider value={userId}>
        <UsernameContext.Provider value={username}>
          <LoginContext.Provider value={loginHandler}>
            <LogoutContext.Provider value={logoutHandler}>
              {children}
            </LogoutContext.Provider>
          </LoginContext.Provider>
        </UsernameContext.Provider>
      </UserIdContext.Provider>
    </AuthContext.Provider>
  );
};

export { useAuth, useUserId, useUsername, useLogin, useLogout, AuthProvider };
