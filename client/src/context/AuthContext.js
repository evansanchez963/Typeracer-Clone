import React, { useState, useEffect, useContext } from "react";

const AuthContext = React.createContext();
const UserIdContext = React.createContext();
const LoginContext = React.createContext();
const LogoutContext = React.createContext();

// Custom hooks to be used in other parts of the application.
const useAuth = () => {
  return useContext(AuthContext);
};

const useUserId = () => {
  return useContext(UserIdContext);
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

  // Check if a user was last logged in by checking local storage.
  useEffect(() => {
    const lastLoggedIn = localStorage.getItem("userData");
    if (lastLoggedIn) {
      const userObject = JSON.parse(lastLoggedIn);
      setUserId(userObject.id);
      setIsLoggedIn(true);
    }
  }, []);

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
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={isLoggedIn}>
      <UserIdContext.Provider value={userId}>
        <LoginContext.Provider value={loginHandler}>
          <LogoutContext.Provider value={logoutHandler}>
            {children}
          </LogoutContext.Provider>
        </LoginContext.Provider>
      </UserIdContext.Provider>
    </AuthContext.Provider>
  );
};

export { useAuth, useUserId, useLogin, useLogout, AuthProvider };
