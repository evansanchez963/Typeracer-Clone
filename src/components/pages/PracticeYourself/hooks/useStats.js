import { useState, useEffect } from "react"

const useStats = (
  getAccuracy,
  gameStatus, 
  gameTimer, 
  setInputInfo, 
  userTypeInfo,
  WPM
  ) => {
  const [finalWPM, setFinalWPM] = useState(0)
  const [time, setTime] = useState(0)
  const [accuracy, setAccuracy] = useState(0)
  const userStats = { finalWPM: finalWPM, time: time, accuracy: accuracy }

   // Get user's stats when game has ended.
   useEffect(() => {
    if(gameStatus.isEnded) {
      setInputInfo(prev => ({...prev, currInput: ""}))
      setFinalWPM(WPM)
      setTime(60000 - gameTimer.time)
      setAccuracy(getAccuracy(userTypeInfo))
    }
  }, [gameStatus.isEnded, setInputInfo, WPM, gameTimer.time, getAccuracy, userTypeInfo])

  return userStats
}

export default useStats