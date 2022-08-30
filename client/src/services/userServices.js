import axios from "axios";

const saveUserStats = async (userStats) => {
  const userObject = localStorage.getItem("userData");
  const user = JSON.parse(userObject);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };

  await axios.put(`/api/user/${user.userId}/session`, userStats, config);
};

export { saveUserStats };
