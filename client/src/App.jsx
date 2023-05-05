import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar, Footer } from "./components/UI/index";
import {
  About,
  Homepage,
  PracticeYourself,
  PlayOnline,
  CreateAccount,
  Login,
  UserProfile,
  GameRoom,
} from "./components/pages/index";
import { ContextProvider } from "./context/index";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <ContextProvider>
        <div className="App">
          <Navbar />
          <div id="col-1"></div>
          <Routes>
            <Route exact path="/" element={<Homepage />}></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route
              exact
              path="/practice-yourself"
              element={<PracticeYourself />}
            ></Route>
            <Route exact path="/play-online" element={<PlayOnline />}></Route>
            <Route
              exact
              path="/create-account"
              element={<CreateAccount />}
            ></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/user/:userId" element={<UserProfile />}></Route>
            <Route
              exact
              path="/gameroom/:roomId"
              element={<GameRoom />}
            ></Route>
          </Routes>
          <div id="col-2"></div>
          <Footer />
        </div>
      </ContextProvider>
    </BrowserRouter>
  );
};

export default App;
