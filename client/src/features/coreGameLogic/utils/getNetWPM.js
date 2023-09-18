const ONE_MINUTE_THIRTY_SECONDS = 90000;
const ONE_SECOND = 1000;
const ONE_MINUTE_IN_SECONDS = 60;

const calcNetWPM = (gameStatus, gameTimer, charsTyped, errors) => {
  if (
    gameStatus === "not_started" ||
    charsTyped === 0 ||
    gameTimer === ONE_MINUTE_THIRTY_SECONDS
  )
    return 0;

  const time =
    (ONE_MINUTE_THIRTY_SECONDS - gameTimer) /
    ONE_SECOND /
    ONE_MINUTE_IN_SECONDS;
  const grossWPM = Math.floor(charsTyped / 5 / time);
  const netWPM = Math.floor(grossWPM - errors / time);

  return netWPM;
};

export default calcNetWPM;
