import { useState, useEffect } from "react";
import { getAccuracy } from "../utils/index";

const useAccuracy = (gameStatus, userTypeInfo) => {
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    if (gameStatus.isEnded) setAccuracy(getAccuracy(userTypeInfo));
  }, [gameStatus.isEnded, userTypeInfo]);

  return accuracy;
};

export default useAccuracy;
