import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Homepage from "./components/Homepage"
import About from "./components/About"
import Footer from "./components/Footer"
import "./styles.css"

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" exact element={<Homepage/>}></Route>
          <Route path="/about" element={<About/>}></Route>
        </Routes>
        <Footer/>
      </div>  
    </BrowserRouter>
  )
}

export default App
