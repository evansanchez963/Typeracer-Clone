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

const getUserInfo = async () => {
  const userObject = localStorage.getItem("userData");
  const user = JSON.parse(userObject);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };

  const { data } = await axios.get(`/api/user/${user.userId}`, config);

  return data;
};

const getUserStats = async () => {
  const userObject = localStorage.getItem("userData");
  const user = JSON.parse(userObject);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };

  const { data } = await axios.get(`/api/user/${user.userId}/stats`, config);

  return data;
};

export { saveUserStats, getUserInfo, getUserStats };
