import { useState } from "react"
import { GameStatusInfo, ProgressBar, Paragraph, Input, ButtonRow, Statistics } from "./index"
import { useFetch, useTimers, useCalcWPM, useStats } from "./hooks/index"
import { getCharClass, getWordClass, getTime, getAccuracy, handleKeyDown, handleChange } from "./helpers/index"
import "./PracticeYourself.css"

const PracticeYourself = () => {

  const [gameStatus, setGameStatus] = useState({isStarted: false, isEnded: false})
  const { countdown, setCountdown, gameTimer } = useTimers(gameStatus, setGameStatus)
  const { loadInfo, textInfo } = useFetch("http://metaphorpsum.com/paragraphs/1/1", setCountdown)
  const [inputInfo, setInputInfo] = useState({currInput: "", inputValid: true})
  const [idxInfo, setIdxInfo] = useState({currCharIdx: -1, currWordIdx: 0})
  const [userTypeInfo, setUserTypeInfo] = useState({charsTyped: 0, errors: 0})
  const WPM = useCalcWPM(gameTimer.time, userTypeInfo.charsTyped, userTypeInfo.errors)
  const userStats = useStats(getAccuracy, gameStatus, gameTimer, setInputInfo, userTypeInfo, WPM) 

  const getStats = () => {
    if(gameStatus.isEnded) return <Statistics userStats={userStats} getTime={getTime}/> 
    else return <></>
  }

  if(loadInfo.loadError) {
    return <div>Error: {loadInfo.loadError.message}</div>
  } else if(loadInfo.isLoading) {
    return <div>Loading...</div>
  } else {
    return (
      <section id="practice-yourself">

        <h1>Practice Racetrack</h1>

        <div id="typing-section">
          <GameStatusInfo gameStatus={gameStatus} countdown={countdown} gameTimer={gameTimer} getTime={getTime}/>
          <ProgressBar chars={textInfo.chars} charsTyped={userTypeInfo.charsTyped} WPM={WPM}/>

          <div id="typing-box">
            <Paragraph words={textInfo.words} getCharClass={getCharClass} getWordClass={getWordClass} gameStatus={gameStatus} inputInfo={inputInfo} idxInfo={idxInfo}/>
            <Input inputInfo={inputInfo} 
            gameStatus={gameStatus} 
            handleKeyDown={(event) => {handleKeyDown(event, setGameStatus, textInfo, inputInfo, setInputInfo, idxInfo, setIdxInfo, setUserTypeInfo)}} 
            handleChange={(event) => {handleChange(event, setInputInfo)}}/>
          </div>
        </div>

        <ButtonRow isEnded={gameStatus.isEnded}/>
        {getStats()}

      </section>
    )
  }
}

export default PracticeYourself