import { useState, useEffect } from "react";
import { getAccuracy } from "../utils/index";

const useAccuracy = (isClientStarted, isClientEnded, charsTyped, errors) => {
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    if (!isClientStarted && !isClientEnded) setAccuracy(0);
    else if (isClientEnded) setAccuracy(getAccuracy(charsTyped, errors));
  }, [isClientStarted, isClientEnded, charsTyped, errors]);

  return accuracy;
};

export default useAccuracy;
