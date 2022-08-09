import { useState, useEffect } from "react";
import { formatTime } from "../utils/index";

const useTime = (isClientStarted, isClientEnded, gameTimer) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    if (!isClientStarted && !isClientEnded) setTime("");
    else if (isClientEnded) setTime(formatTime(60000 - gameTimer));
  }, [isClientStarted, isClientEnded, gameTimer]);

  return time;
};

export default useTime;
