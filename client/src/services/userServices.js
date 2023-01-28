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

  await axios.put(
    `https://typeracer-clone-backend.vercel.app/api/user/${user.userId}/session`,
    userStats,
    config
  );
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

  const { data } = await axios.get(
    `https://typeracer-clone-backend.vercel.app/api/user/${user.userId}`,
    config
  );

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

  const { data } = await axios.get(
    `https://typeracer-clone-backend.vercel.app/api/user/${user.userId}/stats`,
    config
  );

  return data;
};

const deleteUserProgress = async () => {
  const userObject = localStorage.getItem("userData");
  const user = JSON.parse(userObject);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };

  await axios.post(
    `https://typeracer-clone-backend.vercel.app/api/user/${user.userId}/restart`,
    { arr: [] },
    config
  );
};

const deleteAccount = async () => {
  const userObject = localStorage.getItem("userData");
  const user = JSON.parse(userObject);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };

  await axios.delete(
    `https://typeracer-clone-backend.vercel.app/api/user/${user.userId}/delete`,
    config
  );
};

export {
  saveUserStats,
  getUserInfo,
  getUserStats,
  deleteUserProgress,
  deleteAccount,
};
