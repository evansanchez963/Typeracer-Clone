import { useState, useEffect } from "react";
import { getTime } from "../utils/index";

const useTime = (isGameEnded, gameTimer) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    if (isGameEnded) setTime(getTime(60000 - gameTimer.time));
  }, [isGameEnded, gameTimer.time]);

  return time;
};

export default useTime;
