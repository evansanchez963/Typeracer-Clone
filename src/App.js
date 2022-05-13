import Navbar from "./components/Navbar"
import Homepage from "./components/Homepage"
import Footer from "./components/Footer"
import "./styles.css"

const App = () => {
  return (
    <div className="App">
      <Navbar/>
      <Homepage/>
      <Footer/>
    </div>  
  )
}

export default App
