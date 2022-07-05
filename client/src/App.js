import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { About, Footer, Homepage, Navbar, PracticeYourself, CreateAccount, Login, UserProfile } from "./components/index"
import "./App.css"

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check if a user was last logged in in local storage.
  useEffect(() => {
    if(localStorage.getItem("authToken")) {
      setIsLoggedIn(true)
    }
  }, [])

  const loginHandler = (token) => {
    localStorage.setItem("authToken", token)
    setIsLoggedIn(true)
  }

  const logoutHandler = () => {
    localStorage.removeItem("authToken")
    setIsLoggedIn(false)
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} logoutHandler={logoutHandler}/>
        <div id="ad-1"></div>
        <Routes>
          <Route path="/" exact element={<Homepage/>}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/practice-yourself" element={<PracticeYourself/>}></Route>
          <Route path="/create-account" element={<CreateAccount isLoggedIn={isLoggedIn} loginHandler={loginHandler}/>}></Route>
          <Route path="/login" element={<Login isLoggedIn={isLoggedIn} loginHandler={loginHandler}/>}></Route>
          <Route path="/user/:id" element={<UserProfile/>}></Route>
        </Routes>
        <div id="ad-2"></div>
        <Footer/>
      </div>  
    </BrowserRouter>
  )
}

export default App
