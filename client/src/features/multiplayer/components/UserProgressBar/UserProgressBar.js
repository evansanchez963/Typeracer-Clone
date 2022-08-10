import "./UserProgressBar.css";

const UserProgressBar = ({ chars, charsTyped, WPM }) => {
  return (
    <div className="user-progress">
      <progress
        className="user-progress-bar"
        max={chars.length - 1}
        value={charsTyped}
      ></progress>
      <p>{WPM} WPM</p>
    </div>
  );
};

export default UserProgressBar;
