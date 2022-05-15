import { Link } from "react-router-dom"
import { useState, useEffect} from "react"
import "./TypeAlone.css"

const TypeAlone = () => {
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
        console.log(error)
        setIsLoading(false)
      }
    }

    getData()
  }, [])

  return (
    <div>
      {paragraph}
    </div>
  )
}

export default TypeAlone