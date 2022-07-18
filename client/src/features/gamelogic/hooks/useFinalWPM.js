import { useState, useEffect } from "react";

const useFinalWPM = (isEnded, WPM) => {
  const [finalWPM, setFinalWPM] = useState(0);

  useEffect(() => {
    if (isEnded) setFinalWPM(WPM);
  }, [isEnded, WPM]);

  return finalWPM;
};

export default useFinalWPM;
