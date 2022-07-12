import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { About, Footer, Homepage, Navbar, PracticeYourself, CreateAccount, Login, UserProfile } from "./components/index"
import "./App.css"

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState("")

  // Check if a user was last logged in in local storage.
  useEffect(() => {
    const lastLoggedIn = localStorage.getItem("userData")
    if(lastLoggedIn) {
      const userObject = JSON.parse(lastLoggedIn)
      setUserId(userObject.id)
      setIsLoggedIn(true)
    }
  }, [])

  const loginHandler = (token, userId) => {
    const userObject = {
      userId: userId,
      token: token
    }
    localStorage.setItem("userData", JSON.stringify(userObject))
    setUserId(userObject.userId)
    setIsLoggedIn(true)
  }

  const logoutHandler = () => {
    localStorage.removeItem("userData")
    setUserId("")
    setIsLoggedIn(false)
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} userId={userId} logoutHandler={logoutHandler}/>
        <div id="ad-1"></div>
        <Routes>
          <Route exact path="/" element={<Homepage/>}></Route>
          <Route exact path="/about" element={<About/>}></Route>
          <Route exact path="/practice-yourself" element={<PracticeYourself isLoggedIn={isLoggedIn}/>}></Route>
          <Route exact path="/create-account" element={<CreateAccount isLoggedIn={isLoggedIn} loginHandler={loginHandler}/>}></Route>
          <Route exact path="/login" element={<Login isLoggedIn={isLoggedIn} loginHandler={loginHandler}/>}></Route>
          <Route exact path="/user/:userId" element={<UserProfile isLoggedIn={isLoggedIn} logoutHandler={logoutHandler}/>}></Route>
        </Routes>
        <div id="ad-2"></div>
        <Footer/>
      </div>  
    </BrowserRouter>
  )
}

export default App
