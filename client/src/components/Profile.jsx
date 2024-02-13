import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { AiFillEdit } from "react-icons/ai"
import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadURL,
} from "firebase/storage"
import { app } from "../firebase"
import { useDispatch } from "react-redux"
import { toast } from "react-hot-toast"
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signOutSuccess,
  editProfile,
} from "../app/user/userSlice"

const Profile = () => {
  const { currentUser, loading, isEditable, error } = useSelector(
    (state) => state.user
  )
  const [image, setImage] = useState("")
  const fileRef = useRef(null)
  const [imagePercent, setImagePercent] = useState(0)
  const [imageError, setImageError] = useState(false)
  const [formData, setFormData] = useState({})

  const [username, setUserName] = useState(currentUser.username)
  const [email, setEmail] = useState(currentUser.email)
  const [password, setPassword] = useState("")
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (image) {
      handleFileUpload(image)
    }
  }, [image])

  const handleFileUpload = async (image) => {
    setImageError(false)
    const storage = getStorage(app)
    const fileName = new Date().getTime() + image.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, image)

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setImagePercent(Number.parseInt(progress))
      },
      (error) => {
        setImageError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL) =>
            setFormData({ ...formData, profilePicture: downloadURL }),
          toast.success(`Image uploaded successfully`, {
            duration: 3000,
            style: {
              background: "#333",
              borderRadius: "10px",
              color: "#fff",
            },
          })
        )
      }
    )
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }
  console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(updateUserStart())
      const res = await fetch(`api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      // console.log(data)
      if (res.ok) {
        dispatch(updateUserSuccess(data))
        toast.success(`User Updated successfully`, {
          duration: 3000,
          style: {
            background: "#333",
            borderRadius: "10px",
            color: "#fff",
          },
        })
      } else {
        dispatch(updateUserFailure(data))
        toast.error(data.message, {
          duration: 3000,
          style: {
            background: "#333",
            borderRadius: "10px",
            color: "#fff",
          },
        })
      }
    } catch (error) {
      dispatch(updateUserFailure(error))
    }
  }

  const handleDeleteAccount = async () => {
    const result = confirm("Are you sure you want to delete your account?")
    if (result) {
      dispatch(deleteUserStart())
      try {
        const res = await fetch(`api/user/delete/${currentUser._id}`, {
          method: "DELETE",
        })
        const data = await res.json()

        dispatch(deleteUserSuccess(data))
      } catch (error) {
        dispatch(deleteUserFailure(error))
      }
    }
  }

  const handleSignout = async () => {
    const result = confirm("Are you sure you want to log out?")
    if (result) {
      try {
        const res = await fetch(`api/auth/signout`)
        dispatch(signOutSuccess())
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      {isEditable ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={(e) => {
              if (e.target.files[0]) setImage(e.target.files[0])
            }}
          />
          <img
            src={formData.profilePicture || currentUser.profilePicture}
            alt="profile"
            className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2 relative"
          />
          <button
            type="button"
            onClick={() => fileRef.current.click()}
            className="self-center  bg-slate-900 rounded-full p-2 text-white hover:opacity-90 flex"
          >
            <AiFillEdit size={"20px"} />
            &nbsp;Change photo
          </button>
          <p className="text-sm self-center">
            {imageError && (
              <span className="text-red-700">
                Error while uploading image (file size must be less than 2MB)
              </span>
            )}
            {imagePercent > 0 && imagePercent < 100 && (
              <span className="text-slate-700">{`Uploading... ${imagePercent}%`}</span>
            )}
          </p>

          <input
            type="text"
            id="username"
            defaultValue={currentUser.username}
            placeholder="Username"
            className="bg-slate-100 rounded-lg p-3"
            onChange={handleChange}
          />
          <input
            type="email"
            id="email"
            defaultValue={currentUser.email}
            placeholder="Email"
            className="bg-slate-100 rounded-lg p-3"
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            placeholder="Change Password"
            className="bg-slate-100 rounded-lg p-3"
            onChange={handleChange}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-slate-900 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-60 disabled:cursor-no-drop"
          >
            {loading ? "Loading..." : "update"}
          </button>

          <button
            type="button"
            className="bg-slate-900 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-60 disabled:cursor-no-drop"
            onClick={() => {
              dispatch(editProfile(false))
              setUserName(currentUser.username)
              setEmail(currentUser.email)
              setFormData({})
            }}
          >
            cancel
          </button>
        </form>
      ) : (
        // Current User Form
        <form className="flex flex-col gap-4">
          <img
            src={currentUser.profilePicture}
            alt="profile"
            className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2 relative"
          />
          <label htmlFor="" className="text-sm font-bold">
            Username
          </label>
          <input
            type="text"
            defaultValue={currentUser.username}
            placeholder="Username"
            className="bg-slate-100 rounded-lg p-3"
            readOnly
          />
          <label htmlFor="" className="text-sm font-bold">
            Email-id
          </label>
          <input
            type="email"
            defaultValue={currentUser.email}
            placeholder="Email"
            className="bg-slate-100 rounded-lg p-3"
            readOnly
          />

          <button
            type="button"
            className="bg-slate-900 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-60 disabled:cursor-no-drop"
            onClick={() => dispatch(editProfile(true))}
          >
            Edit profile
          </button>
        </form>
      )}

      <p className="text-red-700 mt-5">{error && "Something went wrong ! "}</p>

      <div className="flex justify-between mt-5">
        <span
          className="text-red-700 cursor-pointer hover:underline"
          onClick={handleDeleteAccount}
        >
          Delete account
        </span>
        <span
          className="text-red-700 cursor-pointer hover:underline"
          onClick={handleSignout}
        >
          Sign Out
        </span>
      </div>
    </div>
  )
}
export default Profile
