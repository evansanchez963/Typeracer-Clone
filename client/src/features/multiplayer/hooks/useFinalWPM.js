import { useState, useEffect } from "react";

const useFinalWPM = (isClientStarted, isClientEnded, WPM) => {
  const [finalWPM, setFinalWPM] = useState(0);

  useEffect(() => {
    if (!isClientStarted && !isClientEnded) setFinalWPM(0);
    else if (isClientEnded) setFinalWPM(WPM);
  }, [isClientStarted, isClientEnded, WPM]);

  return finalWPM;
};

export default useFinalWPM;
