import { useLogout } from "../../../../context/AuthContext";
import {
  deleteUserProgress,
  deleteAccount,
} from "../../../../services/userServices";
import "./DangerZone.css";

const deleteProgressHandler = async (resetUserStats) => {
  if (window.confirm("Are you sure you want to delete your progress?")) {
    try {
      await deleteUserProgress();
      resetUserStats();
    } catch (err) {
      alert(err.message);
    }
  }
};

const deleteAccountHandler = async (logoutHandler) => {
  if (window.confirm("Are you sure you want to delete your account?")) {
    try {
      await deleteAccount();
      logoutHandler();
    } catch (err) {
      alert(err.message);
    }
  }
};

const DangerZone = ({ resetUserStats }) => {
  const logoutHandler = useLogout();

  return (
    <div className="danger-zone-container">
      <h1>Danger Zone</h1>
      <button
        className="danger-option"
        onClick={() => deleteProgressHandler(resetUserStats)}
      >
        Delete Progress
      </button>
      <button
        className="danger-option"
        onClick={() => deleteAccountHandler(logoutHandler)}
      >
        Delete Account
      </button>
    </div>
  );
};

export default DangerZone;
