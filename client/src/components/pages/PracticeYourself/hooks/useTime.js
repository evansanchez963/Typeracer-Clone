import { useState, useEffect } from "react"
import { getTime } from "../helpers/index"

const useTime = (gameStatus, gameTimer) => {
  const [time, setTime] = useState("")

  useEffect(() => {
    if(gameStatus.isEnded) setTime(getTime(60000 - gameTimer.time))
  }, [gameStatus.isEnded, gameTimer.time])

  return time
}

export default useTime