import { useState, useEffect } from "react"

const useTimers = (gameStatus, setGameStatus) => {
  const [countdown, setCountdown] = useState({time: 4000, on: false})
  const [gameTimer, setGameTimer] = useState({time: 60000, on: false})

  // Countdown from 3 when first loaded into page.
  useEffect(() => {
    let interval = null

    if(countdown.time < 0) {
      setCountdown(prev => ({...prev, on: false}))
      setGameStatus(prev => ({...prev, isStarted: true}))
      setGameTimer(prev => ({...prev, on: true}))
    } else if(countdown.on) {
      interval = setInterval(() => {
        setCountdown(prev => ({...prev, time: prev.time - 1000}))
      }, 1000)
    } else if (!countdown.on) {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [setGameStatus, countdown.time, countdown.on, setCountdown]) 

    // Start game timer when countdown is over and stop
  // when it has reached 0.
  useEffect(() => {
    let interval = null

    if(gameStatus.isEnded) {
      setGameTimer(prev => ({...prev, on: false}))
    } else if(gameTimer.time < 0) {
      setGameTimer(prev => ({...prev, on: false}))
      setGameStatus(prev => ({...prev, isEnded: true}))
    } else if(gameTimer.on) {
      interval = setInterval(() => {
        setGameTimer(prev => ({...prev, time: prev.time - 1000}))
      }, 1000)
    } else if(!gameTimer.on) {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [setGameStatus, gameTimer.time, gameTimer.on, gameStatus.isEnded])

  return { countdown, setCountdown, gameTimer } 
}

export default useTimers