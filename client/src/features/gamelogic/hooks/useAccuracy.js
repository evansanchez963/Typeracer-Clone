import { useState, useEffect } from "react";
import { getAccuracy } from "../utils/index";

const useAccuracy = (isGameEnded, charsTyped, errors) => {
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    if (isGameEnded) setAccuracy(getAccuracy(charsTyped, errors));
  }, [isGameEnded, charsTyped, errors]);

  return accuracy;
};

export default useAccuracy;
