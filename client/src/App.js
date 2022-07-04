import { BrowserRouter, Routes, Route } from "react-router-dom"
import { About, Footer, Homepage, Navbar, PracticeYourself, CreateAccount, Login, UserProfile } from "./components/index"
import "./App.css"

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <div id="ad-1"></div>
        <Routes>
          <Route path="/" exact element={<Homepage/>}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/practice-yourself" element={<PracticeYourself/>}></Route>
          <Route path="/create-account" element={<CreateAccount/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/user/:id" element={<UserProfile/>}></Route>
        </Routes>
        <div id="ad-2"></div>
        <Footer/>
      </div>  
    </BrowserRouter>
  )
}

export default App
