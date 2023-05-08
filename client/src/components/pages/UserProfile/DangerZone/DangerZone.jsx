import { useAuth } from "../../../../context/AuthContext";
import { deleteAccount } from "../../../../services/userServices";
import "./DangerZone.css";

const handleDeleteAccount = async (handleLogout) => {
  if (window.confirm("Are you sure you want to delete your account?")) {
    try {
      await deleteAccount();
      handleLogout();
    } catch (err) {
      alert(err.message);
    }
  }
};

const DangerZone = ({ onResetProgress }) => {
  const { handleLogout } = useAuth();

  return (
    <div className="danger-zone-container">
      <h1>Danger Zone</h1>
      <button className="danger-option" onClick={onResetProgress}>
        Delete Progress
      </button>
      <button
        className="danger-option"
        onClick={() => handleDeleteAccount(handleLogout)}
      >
        Delete Account
      </button>
    </div>
  );
};

export default DangerZone;
