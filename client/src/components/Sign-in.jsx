import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Signin = () => {
  const [formData, setFormData] = useState({})
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError(false)
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      console.log(data)
      setLoading(false)
      if (data.success == false) {
        setError(true)
        return
      }
      navigate("/")
    } catch (error) {
      setLoading(false)
      setError(true)
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-900 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-60 disabled:cursor-no-drop"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>

      <div className="flex gap-2 mt-5">
        <p className="">Dont Have An Account?</p>
        <Link to={"/signup"}>
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      <p className="text-red-600">{error && "Something went wrong"}</p>
    </div>
  )
}
export default Signin
