import { useState, useEffect } from "react";
import { formatTime } from "../utils/index";

const useTime = (isGameEnded, gameTimer) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    if (isGameEnded) setTime(formatTime(60000 - gameTimer.time));
  }, [isGameEnded, gameTimer.time]);

  return time;
};

export default useTime;
