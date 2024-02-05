import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import About from "./components/About"
import Profile from "./components/Profile"
import Signin from "./components/Sign-in"
import Signup from "./components/Sign-up"
import Header from "./components/Header"

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/about"} element={<About />} />
          <Route path={"/signin"} element={<Signin />} />
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/profile"} element={<Profile />} />
        </Routes>
      </Router>
    </>
  )
}
export default App
