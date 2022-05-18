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

  const getWordClass = (idx) => {
    if(idx === currWordIdx) return "curr-word"
    return ""
  }

  const handleKeyDown = (event) => {
    // Space evaluates word
    if(event.key === " ") {
      if(currInput === words[currWordIdx]) {
        setCurrInput("")
        setCurrWordIdx(prev => prev + 1)
      } else {
        // If input is invalid, do not let user type anymore
        if(inputValid) setCurrInput(prev => prev + " ")
        setInputValid(false)
      }
    } else if(event.key === "Backspace") {
      setInputValid(true)
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