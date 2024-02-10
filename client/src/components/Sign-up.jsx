import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import OAuth from "./OAuth"
import { toast } from "react-hot-toast"

const Signup = () => {
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
      const res = await fetch("/api/auth/signup", {
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
        toast.error(data.message, {
          duration: 3000,
          style: {
            background: "#333",
            borderRadius: "10px",
            color: "#fff",
          },
        })
        setError(true)
        return
      }
      if (data) {
        toast.success(data.message, {
          duration: 3000,
          icon: "🤩",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        })
      }
      navigate("/")
    } catch (error) {
      setLoading(false)
      setError(true)
      toast.error(error, {
        duration: 3000,
        style: {
          background: "#333",
          borderRadius: "10px",
          color: "#fff",
        },
      })
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
          required
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-900 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-60 disabled:cursor-no-drop"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth />
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
