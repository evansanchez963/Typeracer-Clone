import { useState, useEffect } from "react";
import { formatTime } from "../utils/index";

const useTime = (isStarted, isEnded, gameTimer) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    if (!isStarted && !isEnded) setTime("");
    else if (isEnded) setTime(formatTime(60000 - gameTimer));
  }, [isStarted, isEnded, gameTimer]);

  return time;
};

export default useTime;
