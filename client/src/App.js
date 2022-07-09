import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { About, Footer, Homepage, Navbar, PracticeYourself, CreateAccount, Login, UserProfile } from "./components/index"
import "./App.css"

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [savedUsername, setSavedUsername] = useState("")

  // Check if a user was last logged in in local storage.
  useEffect(() => {
    const lastLoggedIn = localStorage.getItem("userData")
    if(lastLoggedIn) {
      const userObject = JSON.parse(lastLoggedIn)
      setSavedUsername(userObject.username)
      setIsLoggedIn(true)
    }
  }, [])

  const loginHandler = (token, username) => {
    const userObject = {
      username: username,
      token: token
    }
    localStorage.setItem("userData", JSON.stringify(userObject))
    setSavedUsername(username)
    setIsLoggedIn(true)
  }

  const logoutHandler = () => {
    localStorage.removeItem("userData")
    setSavedUsername("")
    setIsLoggedIn(false)
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} username={savedUsername} logoutHandler={logoutHandler}/>
        <div id="ad-1"></div>
        <Routes>
          <Route exact path="/" element={<Homepage/>}></Route>
          <Route exact path="/about" element={<About/>}></Route>
          <Route exact path="/practice-yourself" element={<PracticeYourself/>}></Route>
          <Route exact path="/create-account" element={<CreateAccount isLoggedIn={isLoggedIn} loginHandler={loginHandler}/>}></Route>
          <Route exact path="/login" element={<Login isLoggedIn={isLoggedIn} loginHandler={loginHandler}/>}></Route>
          <Route exact path="/user/:username" element={<UserProfile isLoggedIn={isLoggedIn}/>}></Route>
        </Routes>
        <div id="ad-2"></div>
        <Footer/>
      </div>  
    </BrowserRouter>
  )
}

export default App
