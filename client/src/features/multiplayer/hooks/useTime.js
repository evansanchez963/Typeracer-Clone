import { useState, useEffect } from "react";
import { formatTime } from "../../coreGameLogic/utils/index";

const useTime = (isClientStarted, isClientEnded, gameTimer) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    if (!isClientStarted && !isClientEnded) setTime("");
    else if (isClientStarted && !isClientEnded)
      setTime(formatTime(90000 - gameTimer));
  }, [isClientStarted, isClientEnded, gameTimer]);

  return time;
};

export default useTime;
