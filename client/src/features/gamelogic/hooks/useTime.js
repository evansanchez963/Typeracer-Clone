import { useState, useEffect } from "react";
import { formatTime } from "../utils/index";

const useTime = (isEnded, gameTimer) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    if (isEnded) setTime(formatTime(60000 - gameTimer.time));
  }, [isEnded, gameTimer.time]);

  return time;
};

export default useTime;
