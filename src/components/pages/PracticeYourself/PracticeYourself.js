import { useState } from "react"
import { GameStatusInfo, ProgressBar, Paragraph, Input, ButtonRow, Statistics } from "./index"
import { useFetch, useTimers, useCalcWPM, useStats } from "./hooks/index"
import { getCharClass, getWordClass, getTime, getAccuracy } from "./helpers/index"
import "./PracticeYourself.css"

const PracticeYourself = () => {

  const [gameStatus, setGameStatus] = useState({isStarted: false, isEnded: false})
  const {countdown, setCountdown, gameTimer} = useTimers(gameStatus, setGameStatus)
  const {loadInfo, textInfo} = useFetch("http://metaphorpsum.com/paragraphs/1/1", setCountdown)
  const [inputInfo, setInputInfo] = useState({currInput: "", inputValid: true})
  const [idxInfo, setIdxInfo] = useState({currCharIdx: -1, currWordIdx: 0})
  const [userTypeInfo, setUserTypeInfo] = useState({charsTyped: 0, errors: 0})
  const WPM = useCalcWPM(gameTimer.time, userTypeInfo.charsTyped, userTypeInfo.errors)
  const userStats = useStats(getAccuracy, gameStatus, gameTimer, setInputInfo, userTypeInfo, WPM) 

  // Evaluate input when user types.
  // If input is wrong, user can only backspace.
  const handleKeyDown = (event) => {
    
    if(event.key === " ") { // Space evaluates word at current word index.

      if(inputInfo.currInput === textInfo.words[idxInfo.currWordIdx]) {
        setInputInfo(prev => ({...prev, currInput: ""}))
        setIdxInfo(prev => ({...prev, currCharIdx: -1}))
        setIdxInfo(prev => ({...prev, currWordIdx: prev.currWordIdx + 1}))
        setUserTypeInfo(prev => ({...prev, charsTyped: prev.charsTyped + 1}))
      } else {
        if(inputInfo.inputValid) {
          setInputInfo(prev => ({...prev, currInput: prev.currInput + " "}))
          setIdxInfo(prev => ({...prev, currCharIdx: prev.currCharIdx + 1}))
        }
        setInputInfo(prev => ({...prev, inputValid: false}))
        setUserTypeInfo(prev => ({...prev, errors: prev.errors + 1}))
      }

    } else if(event.key === "Backspace") {

      if(!inputInfo.inputValid) setInputInfo(prev => ({...prev, inputValid: true})) 
      if(inputInfo.currInput !== "") setIdxInfo(prev => ({...prev, currCharIdx: prev.currCharIdx - 1})) 

    } else { // Evaluate whether current typed character is correct.

      if(event.key !== "Shift" && inputInfo.inputValid) {
        const lastWord = textInfo.words[textInfo.words.length - 1]
        const lastWordChars = lastWord.split("")
        const lastChar = lastWordChars[lastWordChars.length - 1]

        // If user is on the very last character and it's correct,
        // clear input and end game. Else evaluate.
        if((textInfo.words.length - 1 === idxInfo.currWordIdx) && (lastWordChars.length - 1 === idxInfo.currCharIdx + 1) && (lastChar === event.key)) {
          setIdxInfo(prev => ({...prev, currCharIdx: -1}))
          setIdxInfo(prev => ({...prev, currWordIdx: prev.currWordIdx + 1}))
          setGameStatus(prev => ({...prev, isEnded: true}))
        } else {
          const charToCheck = textInfo.words[idxInfo.currWordIdx].split("")[idxInfo.currCharIdx + 1]

          if(event.key !== charToCheck) {
            if(inputInfo.inputValid) {
              setInputInfo(prev => ({...prev, currInput: prev.currInput + event.key}))
              setIdxInfo(prev => ({...prev, currCharIdx: prev.currCharIdx + 1}))
            }
            setInputInfo(prev => ({...prev, inputValid: false}))
            setUserTypeInfo(prev => ({...prev, errors: prev.errors + 1}))
          } else {
            setIdxInfo(prev => ({...prev, currCharIdx: prev.currCharIdx + 1}))
            setUserTypeInfo(prev => ({...prev, charsTyped: prev.charsTyped + 1}))
          }

        }
      }

    }
  }

  const handleChange = (event) => {
    setInputInfo(prev => ({...prev, currInput: event.target.value.trim()}))
  }

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
            <Input inputInfo={inputInfo} gameStatus={gameStatus} handleKeyDown={handleKeyDown} handleChange={handleChange}/>
          </div>
        </div>

        <ButtonRow isEnded={gameStatus.isEnded}/>
        {getStats()}

      </section>
    )
  }
}

export default PracticeYourself