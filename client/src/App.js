import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  About,
  Footer,
  Homepage,
  Navbar,
  PracticeYourself,
  PlayOnline,
  CreateAccount,
  Login,
  UserProfile,
} from "./components/index";
import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <SocketProvider>
        <BrowserRouter>
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
              <Route
                exact
                path="/user/:userId"
                element={<UserProfile />}
              ></Route>
            </Routes>
            <div id="col-2"></div>
            <Footer />
          </div>
        </BrowserRouter>
      </SocketProvider>
    </AuthProvider>
  );
};

export default App;
