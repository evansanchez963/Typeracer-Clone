import { useState, useEffect } from "react";
import { getAccuracy } from "../../coreGameLogic/utils/index";

const useAccuracy = (isStarted, isEnded, charsTyped, errors) => {
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    if (!isStarted && !isEnded) setAccuracy(0);
    else if (isEnded) setAccuracy(getAccuracy(charsTyped, errors));
  }, [isStarted, isEnded, charsTyped, errors]);

  return accuracy;
};

export default useAccuracy;
