import { Link } from "react-router-dom"

const Signup = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 p-3 rounded-lg"
        />
        <button
          disabled={false}
          className="bg-slate-900 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-60 disabled:cursor-no-drop"
        >
          Sign Up
        </button>
      </form>

      <div className="flex gap-2 mt-5">
        <p className="">Have an account?</p>
        <Link to={"/signin"}>
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
    </div>
  )
}
export default Signup
