import { BrowserRouter, Routes, Route } from "react-router-dom"
import { About, Footer, Homepage, Navbar, TypeAlone } from "./components/index"
import "./App.css"

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" exact element={<Homepage/>}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/practice-yourself" element={<TypeAlone/>}></Route>
        </Routes>
        <Footer/>
      </div>  
    </BrowserRouter>
  )
}

export default App
