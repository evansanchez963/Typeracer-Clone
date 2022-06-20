import { BrowserRouter, Routes, Route } from "react-router-dom"
import { About, Footer, Homepage, Navbar, PracticeYourself, CreateAccount, Login } from "./components/index"
import "./App.css"

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" exact element={<Homepage/>}></Route>
          <Route path="/about" exact element={<About/>}></Route>
          <Route path="/practice-yourself" exact element={<PracticeYourself/>}></Route>
          <Route path="/create-account" exact element={<CreateAccount/>}></Route>
          <Route path="/login" exact element={<Login/>}></Route>
        </Routes>
        <Footer/>
      </div>  
    </BrowserRouter>
  )
}

export default App
