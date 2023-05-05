import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserInfo, UserStats, DangerZone } from "./index";
import { useAuth } from "../../../context/AuthContext";
import { getUserInfo, getUserStats } from "../../../services/userServices";
import "./UserProfile.css";

const UserProfile = () => {
  const { isLoggedIn } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avgWPM, setAvgWPM] = useState(0);
  const [highestWPM, setHighestWPM] = useState(0);
  const [raceCount, setRaceCount] = useState(0);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();

        setUsername(data.username);
        setEmail(data.email);
      } catch (err) {
        setUsername("Error");
        setEmail("Error");
        alert(err);
      }
    };

    const fetchUserStats = async () => {
      try {
        const data = await getUserStats();

        setAvgWPM(data.avgWPM);
        setHighestWPM(data.highestWPM);
        setRaceCount(data.raceCount);
      } catch (err) {
        setAvgWPM("Error");
        setHighestWPM("Error");
        setRaceCount("Error");
        alert(err.message);
      }
    };

    if (isLoggedIn) {
      fetchUserInfo();
      fetchUserStats();
    }
  }, [isLoggedIn]);

  const resetUserStats = () => {
    setAvgWPM(0);
    setHighestWPM(0);
    setRaceCount(0);
  };

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <section id="user-profile">
      <UserInfo
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
      />
      <UserStats
        avgWPM={avgWPM}
        highestWPM={highestWPM}
        raceCount={raceCount}
      />
      <DangerZone resetUserStats={resetUserStats} />
    </section>
  );
};

export default UserProfile;
