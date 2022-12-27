import { useState, useEffect } from "react";
import { formatTime } from "../../coreGameLogic/utils/index";

const useTime = (isStarted, isEnded, gameTimer) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    if (!isStarted && !isEnded) setTime("");
    else if (isStarted && !isEnded) setTime(formatTime(90000 - gameTimer));
  }, [isStarted, isEnded, gameTimer]);

  return time;
};

export default useTime;
