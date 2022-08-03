import "./UserProgressBar.css";

const UserProgressBar = () => {
  return (
    <div className="user-progress">
      <progress className="user-progress-bar" max={100} value={50}></progress>
      <p>100 WPM</p>
    </div>
  );
};

export default UserProgressBar;
