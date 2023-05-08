import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserInfo, UserStats, DangerZone } from "./index";
import { useAuth } from "../../../context/AuthContext";
import {
  getUserInfo,
  getUserStats,
  deleteUserProgress,
} from "../../../services/userServices";
import "./UserProfile.css";

const UserProfile = () => {
  const { isLoggedIn } = useAuth();
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
  });
  const [userStats, setUserStats] = useState({
    avgWPM: 0,
    highestWPM: 0,
    raceCount: 0,
  });

  const loadUserInfo = async () => {
    try {
      const data = await getUserInfo();

      setUserInfo({ username: data.username, email: data.email });
    } catch (err) {
      setUserInfo({ username: "Error", email: "Error" });
      alert(err);
    }
  };

  const loadUserStats = async () => {
    try {
      const data = await getUserStats();

      setUserStats({
        avgWPM: data.avgWPM,
        highestWPM: data.highestWPM,
        raceCount: data.raceCount,
      });
    } catch (err) {
      setUserStats({
        avgWPM: "Error",
        highestWPM: "Error",
        raceCount: "Error",
      });
      alert(err.message);
    }
  };

  const resetUserProgress = async () => {
    if (window.confirm("Are you sure you want to delete your progress?")) {
      try {
        await deleteUserProgress();
        await loadUserStats();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      loadUserInfo();
      loadUserStats();
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <section id="user-profile">
      <UserInfo
        username={userInfo.username}
        email={userInfo.email}
        onChange={setUserInfo}
      />
      <UserStats
        avgWPM={userStats.avgWPM}
        highestWPM={userStats.highestWPM}
        raceCount={userStats.raceCount}
      />
      <DangerZone onResetProgress={resetUserProgress} />
    </section>
  );
};

export default UserProfile;
