import "./ProgressBar.css";

const ProgressBar = ({ chars, charsTyped, WPM }) => {
  return (
    <div className="game-progress">
      <progress
        className="progress-bar"
        max={chars.length - 1}
        value={charsTyped}
      ></progress>
      <p>{WPM} WPM</p>
    </div>
  );
};

export default ProgressBar;
