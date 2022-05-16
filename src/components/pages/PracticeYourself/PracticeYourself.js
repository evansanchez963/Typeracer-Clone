import { Link } from "react-router-dom"
import { useState, useEffect} from "react"
import { TypingSection } from "./index"
import "./PracticeYourself.css"

const PracticeYourself = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [paragraph, setParagraph] = useState("")

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://metaphorpsum.com/paragraphs/1/5")
        const text = await response.text()
        setParagraph(text)
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

  if(error) {
    return <div>Error: {error.message}</div>
  } else if(isLoading) {
    return <div>Loading...</div>
  } else {
    return (
      <section id="practice-yourself">

        <h1>Practice Racetrack</h1>

        <TypingSection paragraph={paragraph}></TypingSection>

        <div id="practice-yourself-button-row">
          <Link to="/">
            <button id="leave-practice">Main menu (leave practice)</button>
          </Link>
          <button id="new-race">New race</button>
        </div>

      </section>
    )
  }
}

export default PracticeYourself