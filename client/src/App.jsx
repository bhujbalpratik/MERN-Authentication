import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom"
import Layout from "./Layout"
import Home from "./components/Home"
import About from "./components/About"
import Profile from "./components/Profile"
import Signin from "./components/Sign-in"
import Signup from "./components/Sign-up"

const Router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="profile" element={<Profile />} />
      <Route path="signin" element={<Signin />} />
      <Route path="signup" element={<Signup />} />
    </Route>,
  ])
)

const App = () => {
  return <RouterProvider router={Router} />
}
export default App
