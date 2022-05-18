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

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://metaphorpsum.com/paragraphs/1/5")
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
  }

  const handleKeyDown = (event) => {
    // Space evaluates word at current word index
    if(event.key === " ") {

      if(currInput === words[currWordIdx]) {
        setCurrInput("")
        setCurrCharIdx(-1)
        setCurrWordIdx(prev => prev + 1)
      } else {
        // If input is invalid, do not let user type anymore
        if(inputValid) {
          setCurrInput(prev => prev + " ")
          setCurrCharIdx(prev => prev + 1)
        }
        setInputValid(false)
      }

    } else if(event.key === "Backspace") {

      if(!inputValid) setInputValid(true)
      if(currInput !== "") setCurrCharIdx(prev => prev - 1)

    } else { // Evaluate whether current typed character is correct 
      
      if(event.key !== "Shift" && inputValid) {
        const charToCheck = words[currWordIdx].split("")[currCharIdx+1]

        if(event.key !== charToCheck) {
          if(inputValid) {
            setCurrInput(prev => prev + event.key)
            setCurrCharIdx(prev => prev + 1)
          }
          setInputValid(false)
        } else setCurrCharIdx(prev => prev + 1)
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
        ></TypingSection>

        <div id="practice-yourself-button-row">
          <Link to="/">
            <button id="leave-practice">Main menu (leave practice)</button>
          </Link>
          <button id="new-race">New race</button>
        </div>

        <Statistics></Statistics>

      </section>
    )
  }
}

export default PracticeYourself