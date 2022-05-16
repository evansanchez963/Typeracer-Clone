import { useState, useEffect} from "react"
import { TypingBox } from "./index"
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
        <TypingBox ></TypingBox>
      </section>
    )
  }
}

export default PracticeYourself