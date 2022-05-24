import { useState, useEffect } from "react"

const useFetch = (url, setCountdown) => {
  const [loadInfo, setLoadInfo] = useState({isLoading: true, loadError: null})
  const [textInfo, setTextInfo] = useState({chars: [], words: []})

  // Get data from metaphorsum API and turn on countdown timer.
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(url)
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
  }, [url, setCountdown])

  return { loadInfo, textInfo, setCountdown }
}

export default useFetch