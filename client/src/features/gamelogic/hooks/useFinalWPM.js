import { useState, useEffect } from "react";

const useFinalWPM = (gameStatus, WPM) => {
  const [finalWPM, setFinalWPM] = useState(0);

  useEffect(() => {
    if (gameStatus.isEnded) setFinalWPM(WPM);
  }, [gameStatus.isEnded, WPM]);

  return finalWPM;
};

export default useFinalWPM;
