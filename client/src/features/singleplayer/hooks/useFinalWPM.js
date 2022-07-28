import { useState, useEffect } from "react";

const useFinalWPM = (isStarted, isEnded, WPM) => {
  const [finalWPM, setFinalWPM] = useState(0);

  useEffect(() => {
    if (!isStarted && !isEnded) setFinalWPM(0);
    else if (isEnded) setFinalWPM(WPM);
  }, [isStarted, isEnded, WPM]);

  return finalWPM;
};

export default useFinalWPM;
