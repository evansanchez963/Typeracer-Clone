/*
import { useState, useEffect } from "react";

const calcWPM = (gameTimer, charsTyped, errors) => {
  const time = (90000 - gameTimer) / 1000 / 60;
  const grossWPM = Math.floor(charsTyped / 5 / time);
  const netWPM = Math.floor(grossWPM - errors / time);

  if (charsTyped === 0 || gameTimer === 90000 || netWPM < 0) return 0;
  return netWPM;
};

const useCalcWPM = (
  isClientStarted,
  isClientEnded,
  gameTimer,
  charsTyped,
  errors
) => {
  const [netWPM, setNetWPM] = useState(0);

  useEffect(() => {
    if (isClientStarted && !isClientEnded)
      setNetWPM(calcWPM(gameTimer, charsTyped, errors));
  }, [isClientStarted, isClientEnded, gameTimer, charsTyped, errors]);

  if (!isClientStarted && !isClientEnded) return 0;
  return netWPM;
};

export default useCalcWPM;
*/
