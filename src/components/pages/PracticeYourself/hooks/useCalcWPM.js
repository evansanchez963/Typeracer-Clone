import { useState, useEffect } from "react"

const calcWPM = (gameTimer, charsTyped, errors) => {
  if(charsTyped === 0 || gameTimer === 60000) return 0

  const time = (((60000 - gameTimer) / 1000) / 60)
  const grossWPM = Math.floor((charsTyped / 5) / time)
  const netWPM = Math.floor(grossWPM - (errors / time))

  return netWPM
}

const useCalcWPM = (gameTimer, charsTyped, errors) => {
  const [netWPM, setNetWPM] = useState(0)

  useEffect(() => {
    setNetWPM(calcWPM(gameTimer, charsTyped, errors))
  }, [gameTimer, charsTyped, errors])

  return netWPM
}

export default useCalcWPM