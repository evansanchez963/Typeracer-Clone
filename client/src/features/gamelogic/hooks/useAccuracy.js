import { useState, useEffect } from "react";
import { getAccuracy } from "../utils/index";

const useAccuracy = (isEnded, charsTyped, errors) => {
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    if (isEnded) setAccuracy(getAccuracy(charsTyped, errors));
  }, [isEnded, charsTyped, errors]);

  return accuracy;
};

export default useAccuracy;
