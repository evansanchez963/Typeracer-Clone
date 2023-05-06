import React, { useState, useEffect, useContext, createContext } from "react";
import { getUserInfo } from "../services/userServices";

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");

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
      try {
        const data = await getUserInfo();
        setUsername(data.username);
      } catch {
        setUsername("Error");
      }
    };

    if (isLoggedIn) getUsername();
  }, [isLoggedIn]);

  const handleLogin = (token, userId) => {
    const userObject = {
      userId: userId,
      token: token,
    };
    localStorage.setItem("userData", JSON.stringify(userObject));
    setUserId(userObject.userId);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setUserId("");
    setUsername("");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userId, username, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
