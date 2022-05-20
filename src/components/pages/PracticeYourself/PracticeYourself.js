import { Link } from "react-router-dom"
import { useState, useEffect} from "react"
import { TypingSection, Statistics } from "./index"
import { useCalcWPM } from "./hooks/index"
import "./PracticeYourself.css"

const PracticeYourself = () => {
  const [loadInfo, setLoadInfo] = useState({isLoading: true, loadError: null})
  const [textInfo, setTextInfo] = useState({chars: [], words: []})
  const [inputInfo, setInputInfo] = useState({currInput: "", inputValid: true})
  const [idxInfo, setIdxInfo] = useState({currCharIdx: -1, currWordIdx: 0})
  const [gameStatus, setGameStatus] = useState({isStarted: false, isEnded: false})
  const [countdown, setCountdown] = useState({time: 3000, on: false})
  const [gameTimer, setGameTimer] = useState({time: 60000, on: false})
  const [userTypeInfo, setUserTypeInfo] = useState({charsTyped: 0, errors: 0})
  const [userStats, setUserStats] = useState({finalWPM: 0, time: 0, accuracy: 0})
  const WPM = useCalcWPM(gameTimer.time, userTypeInfo.charsTyped, userTypeInfo.errors)

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://metaphorpsum.com/paragraphs/1/1")
        const text = await response.text()
        setTextInfo(prev => ({...prev, chars: text.split("")}))
        setTextInfo(prev => ({...prev, words: text.split(" ")}))
        setLoadInfo(prev => ({...prev, isLoading: false}))
        setCountdown(prev => ({...prev, on: true}))
        if(!response.ok) {
          throw Error(response.statusText)
        }
      } catch(loadError) {
        setLoadInfo(prev => ({...prev, loadError: loadError}))
        setLoadInfo(prev => ({...prev, isLoading: false}))
      }
    }

    getData()
  }, [])

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
  }, [countdown.time, countdown.on]) 

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
  }, [gameTimer.time, gameTimer.on, gameStatus.isEnded])

  useEffect(() => {
    if(gameStatus.isEnded) {
      setInputInfo(prev => ({...prev, currInput: ""}))
      setUserStats(prev => ({...prev, finalWPM: WPM}))
      setUserStats(prev => ({...prev, time: 60000 - gameTimer.time}))
      setUserStats(prev => ({...prev, accuracy: (((userTypeInfo.charsTyped - userTypeInfo.errors) / userTypeInfo.charsTyped) * 100).toFixed(1)}))
    }
  }, [gameStatus.isEnded, WPM, gameTimer.time, userTypeInfo.charsTyped, userTypeInfo.errors])

  const getWordClass = (wordIdx) => {
    if(wordIdx === idxInfo.currWordIdx) return "active-word"
    return ""
  }

  const getCharClass = (char, charIdx, wordIdx) => {
    if(charIdx === idxInfo.currCharIdx && wordIdx === idxInfo.currWordIdx) {
      if(char === inputInfo.currInput.split("")[charIdx]) return "correct"
      else {
        return "incorrect"
      }
    } 
    // Put blinking cursor on active character.
    else if(charIdx === idxInfo.currCharIdx + 1 && wordIdx === idxInfo.currWordIdx) {
      return "active-char"
    }
    // Set past characters on current word as correct.
    else if(wordIdx === idxInfo.currWordIdx && charIdx < idxInfo.currCharIdx) {
      return "correct"
    } 
    // Set all past words as correct.
    else if(wordIdx < idxInfo.currWordIdx) {
      return "correct"
    }

    return ""
  }

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

  if(loadInfo.loadError) {
    return <div>Error: {loadInfo.loadError.message}</div>
  } else if(loadInfo.isLoading) {
    return <div>Loading...</div>
  } else {
    return (
      <section id="practice-yourself">

        <h1>Practice Racetrack</h1>

        <TypingSection 
          chars={textInfo.chars}
          words={textInfo.words} 
          currInput={inputInfo.currInput} 
          inputValid={inputInfo.inputValid}
          getWordClass={getWordClass}
          getCharClass={getCharClass}
          handleKeyDown={handleKeyDown} 
          handleChange={handleChange}
          isStarted={gameStatus.isStarted}
          isEnded={gameStatus.isEnded}
          countdown={countdown.time}
          countdownOn={countdown.on}
          gameTimer={gameTimer.time}
          gameTimerOn={gameTimer.on}
          charsTyped={userTypeInfo.charsTyped}
          WPM={WPM}
        ></TypingSection>

        <div id="practice-yourself-button-row">
          <Link to="/">
            <button id="leave-practice">Main menu (leave practice)</button>
          </Link>
          <button id="new-race" style={{display: gameStatus.isEnded ? "block":"none"}} onClick={() => window.location.reload()}>New race</button>
        </div>

        <Statistics isEnded={gameStatus.isEnded} finalWPM={userStats.finalWPM} time={userStats.time} accuracy={userStats.accuracy}></Statistics>

      </section>
    )
  }
}

export default PracticeYourself