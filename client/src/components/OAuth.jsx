import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"
import { useDispatch } from "react-redux"
import {
  signinStart,
  signinSuccess,
  signinFalilure,
} from "../app/user/userSlice"
import { app } from "../firebase"
const OAuth = () => {
  const dispatch = useDispatch()
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, provider)
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      })
      const data = await res.json()
      console.log(data)
      dispatch(signinSuccess(data))
    } catch (error) {
      console.log("Could not signin with google", error)
    }
  }
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-85"
    >
      continue with google
    </button>
  )
}
export default OAuth
