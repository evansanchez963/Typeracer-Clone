import { Link } from "react-router-dom"
import { useState, useEffect} from "react"
import { TypingSection, Statistics } from "./index"
import "./PracticeYourself.css"

const PracticeYourself = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [words, setWords] = useState([])
  const [currInput, setCurrInput] = useState("")
  const [inputValid, setInputValid] = useState(true)
  const [currCharIdx, setCurrCharIdx] = useState(-1)
  const [currWordIdx, setCurrWordIdx] = useState(0)
  const [isEnded, setIsEnded] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const url = "http://metaphorpsum.com/paragraphs/1/1"
        const response = await fetch(url)
        const text = await response.text()
        setWords(text.split(" "))
        setIsLoading(false)
        if(!response.ok) {
          throw Error(response.statusText)
        }
      } catch(error) {
        setError(error)
        setIsLoading(false)
      }
    }

    getData()
  }, [])

  useEffect(() => {
    if(isEnded) {
      setCurrInput("")
    }
  }, [isEnded])

  const getWordClass = (wordIdx) => {
    if(wordIdx === currWordIdx) return "active-word"
    return ""
  }

  const getCharClass = (char, charIdx, wordIdx) => {
    if(charIdx === currCharIdx && wordIdx === currWordIdx) {
      if(char === currInput.split("")[charIdx]) return "correct"
      else {
        return "incorrect"
      }
    } 
    // Put blinking cursor on active character.
    else if(charIdx === currCharIdx + 1 && wordIdx === currWordIdx) {
      return "active-char"
    }
    // Set past characters on current word as correct.
    else if(wordIdx === currWordIdx && charIdx < currCharIdx) {
      return "correct"
    } 
    // Set all past words as correct.
    else if(wordIdx < currWordIdx) {
      return "correct"
    }

    return ""
  }

  // Evaluate input when user types.
  // If input is wrong, user can only backspace.
  const handleKeyDown = (event) => {
    
    if(event.key === " ") { // Space evaluates word at current word index.

      if(currInput === words[currWordIdx]) {
        setCurrInput("")
        setCurrCharIdx(-1)
        setCurrWordIdx(prev => prev + 1)
      } else {
        if(inputValid) {
          setCurrInput(prev => prev + " ")
          setCurrCharIdx(prev => prev + 1)
        }
        setInputValid(false)
      }

    } else if(event.key === "Backspace") {

      if(!inputValid) setInputValid(true)
      if(currInput !== "") setCurrCharIdx(prev => prev - 1)

    } else { // Evaluate whether current typed character is correct.

      if(event.key !== "Shift" && inputValid) {
        const lastWord = words[words.length - 1]
        const lastWordChars = lastWord.split("")
        const lastChar = lastWordChars[lastWordChars.length - 1]

        // If user is on the very last character and it's correct,
        // clear input and end game. Else evaluate.
        if((words.length - 1 === currWordIdx) && (lastWordChars.length - 1 === currCharIdx + 1) && (lastChar === event.key)) {

          setCurrCharIdx(-1)
          setCurrWordIdx(prev => prev + 1)
          setIsEnded(true)

        } else {

          const charToCheck = words[currWordIdx].split("")[currCharIdx + 1]

          if(event.key !== charToCheck) {
            if(inputValid) {
              setCurrInput(prev => prev + event.key)
              setCurrCharIdx(prev => prev + 1)
            }
            setInputValid(false)
          } else {
            setCurrCharIdx(prev => prev + 1)
          }

        }
      }

    }
  }

  const handleChange = (event) => {
    setCurrInput(event.target.value.trim())
  }

  if(error) {
    return <div>Error: {error.message}</div>
  } else if(isLoading) {
    return <div>Loading...</div>
  } else {
    return (
      <section id="practice-yourself">

        <h1>Practice Racetrack</h1>

        <TypingSection 
          words={words} 
          currInput={currInput} 
          inputValid={inputValid}
          getWordClass={getWordClass}
          getCharClass={getCharClass}
          handleKeyDown={handleKeyDown} 
          handleChange={handleChange}
          isEnded={isEnded}
        ></TypingSection>

        <div id="practice-yourself-button-row">
          <Link to="/">
            <button id="leave-practice">Main menu (leave practice)</button>
          </Link>
          <button id="new-race" style={{display: isEnded ? "block":"none"}} onClick={() => window.location.reload()}>New race</button>
        </div>

        <Statistics isEnded={isEnded}></Statistics>

      </section>
    )
  }
}

export default PracticeYourself