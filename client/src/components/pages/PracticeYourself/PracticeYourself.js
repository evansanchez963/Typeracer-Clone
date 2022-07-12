import { useEffect, useState } from "react"
import { GameStatusInfo, ProgressBar, Paragraph, Input, ButtonRow, Statistics } from "./index"
import { useFetch, useTimers, useCalcWPM, useFinalWPM, useTime, useAccuracy } from "./hooks/index"
import { getCharClass, getWordClass, getTime, handleKeyDown, handleChange } from "./helpers/index"
import axios from "axios"
import "./PracticeYourself.css"

const PracticeYourself = ({ isLoggedIn }) => {

  const [gameStatus, setGameStatus] = useState({isStarted: false, isEnded: false})
  const { countdown, setCountdown, gameTimer } = useTimers(gameStatus, setGameStatus)
  const { loadInfo, textInfo } = useFetch("http://metaphorpsum.com/paragraphs/1/1", setCountdown)
  const [inputInfo, setInputInfo] = useState({currInput: "", inputValid: true})
  const [idxInfo, setIdxInfo] = useState({currCharIdx: -1, currWordIdx: 0})
  const [userTypeInfo, setUserTypeInfo] = useState({charsTyped: 0, errors: 0})
  const WPM = useCalcWPM(gameTimer.time, userTypeInfo.charsTyped, userTypeInfo.errors)
  const finalWPM = useFinalWPM(gameStatus, WPM)
  const time = useTime(gameStatus, gameTimer)
  const accuracy = useAccuracy(gameStatus, userTypeInfo)
  //const userStats = useStats(getAccuracy, gameStatus, gameTimer, setInputInfo, userTypeInfo, WPM, isLoggedIn) 

  const userStats = { 
    finalWPM: finalWPM, 
    time: time, 
    accuracy: accuracy 
  }

  useEffect(() => {
    const pushUserStats = async () => {
      const userObject = localStorage.getItem("userData")
      const user = JSON.parse(userObject)
      const userData = {
        WPM: finalWPM,
        time: time,
        accuracy: accuracy,
        date: Date.now()
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        }
      }
  
      try {
        await axios.put(
          `api/user/${user.userId}/session`,
          userData,
          config
        )
      } catch (err) {
        alert(err.message)
      }
    } 

    if(gameStatus.isEnded) setInputInfo(prev => ({...prev, currInput: ""}))
    if(gameStatus.isEnded && isLoggedIn) pushUserStats()
  }, [isLoggedIn, gameStatus.isEnded, finalWPM, time, accuracy])

  const getStats = () => {
    if(gameStatus.isEnded) return <Statistics userStats={userStats}/> 
    else return <></>
  }

  if(loadInfo.loadError) {
    return <div>Error: {loadInfo.loadError.message}</div>
  } else if(loadInfo.isLoading) {
    return <div>Loading...</div>
  } else {
    return (
      <section id="practice-yourself">

        <div className="py-wrapper">
          <h1>Practice Racetrack</h1>

          <div className="typing-section">
            <GameStatusInfo gameStatus={gameStatus} countdown={countdown} gameTimer={gameTimer} getTime={getTime}/>
            <ProgressBar chars={textInfo.chars} charsTyped={userTypeInfo.charsTyped} WPM={WPM}/>

            <div className="typing-box">
              <Paragraph words={textInfo.words} getCharClass={getCharClass} getWordClass={getWordClass} gameStatus={gameStatus} inputInfo={inputInfo} idxInfo={idxInfo}/>
              <Input inputInfo={inputInfo} 
              gameStatus={gameStatus} 
              handleKeyDown={(event) => {handleKeyDown(event, setGameStatus, textInfo, inputInfo, setInputInfo, idxInfo, setIdxInfo, setUserTypeInfo)}} 
              handleChange={(event) => {handleChange(event, setInputInfo)}}/>
            </div>
          </div>

          <ButtonRow isEnded={gameStatus.isEnded}/>
          {getStats()}
        </div>

      </section>
    )
  }
}

export default PracticeYourself