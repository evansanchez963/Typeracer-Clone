const ONE_MINUTE_THIRTY_SECONDS = 90000;

const formatTime = (time) => {
  const minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
  const seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);

  return `${minutes}:${seconds}`;
};

const getTime = (gameStatus, gameTimer) => {
  if (gameStatus === "not_started") return "";
  else if (gameStatus === "started")
    return formatTime(ONE_MINUTE_THIRTY_SECONDS - gameTimer);
};

export default getTime;
