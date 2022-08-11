import { useState, useEffect } from "react";

const calcWPM = (gameTimer, charsTyped, errors) => {
  const time = (60000 - gameTimer) / 1000 / 60;
  const grossWPM = Math.floor(charsTyped / 5 / time);
  const netWPM = Math.floor(grossWPM - errors / time);

  if (charsTyped === 0 || gameTimer === 60000 || netWPM < 0) return 0;
  return netWPM;
};

const useCalcWPM = (isStarted, isEnded, gameTimer, charsTyped, errors) => {
  const [netWPM, setNetWPM] = useState(0);

  useEffect(() => {
    if (isStarted && !isEnded)
      setNetWPM(calcWPM(gameTimer, charsTyped, errors));
  }, [isStarted, isEnded, gameTimer, charsTyped, errors]);

  if (!isStarted && !isEnded) return 0;
  return netWPM;
};

export default useCalcWPM;
