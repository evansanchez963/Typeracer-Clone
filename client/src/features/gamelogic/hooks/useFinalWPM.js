import { useState, useEffect } from "react";

const useFinalWPM = (isGameEnded, WPM) => {
  const [finalWPM, setFinalWPM] = useState(0);

  useEffect(() => {
    if (isGameEnded) setFinalWPM(WPM);
  }, [isGameEnded, WPM]);

  return finalWPM;
};

export default useFinalWPM;
