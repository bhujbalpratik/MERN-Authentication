import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
const Header = () => {
  const { currentUser } = useSelector((state) => state.user)
  return (
    <header className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={"/"}>
          <h1 className="font-bold">Auth APP</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to={"/"}>
            <li>Home</li>
          </Link>
          <Link to={"/about"}>
            <li>About</li>
          </Link>
          <Link to={"/profile"}>
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt="profile"
                className="h-7 w-7 rounded-full object-cover"
              />
            ) : (
              <li>Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  )
}
export default Header
