import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-hot-toast"
import {
  signinStart,
  signinSuccess,
  signinFalilure,
} from "../app/user/userSlice"
import OAuth from "./OAuth"

const Signin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({})
  const { loading, error } = useSelector((state) => state.user)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      dispatch(signinStart())
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success === false) {
        dispatch(signinFalilure(data))
        toast.error(data.message, {
          duration: 3000,
          style: {
            background: "#333",
            borderRadius: "10px",
            color: "#fff",
          },
        })
        return
      }
      dispatch(signinSuccess(data))
      toast.success(`Welcome ,${data.username}`, {
        duration: 3000,
        icon: "😎",
        style: {
          background: "#333",
          borderRadius: "10px",
          color: "#fff",
        },
      })
      navigate("/")
    } catch (error) {
      dispatch(signinFalilure(error))
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
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
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
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>

      <div className="flex gap-2 mt-5">
        <p className="">Dont Have An Account?</p>
        <Link to={"/signup"}>
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
    </div>
  )
}
export default Signin
