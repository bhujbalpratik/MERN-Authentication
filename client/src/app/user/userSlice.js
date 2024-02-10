import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentUser: null,
  loading: false,
  isEditable: false,
  error: false,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signinStart: (state) => {
      state.loading = true
      state.isEditable = false
    },
    signinSuccess: (state, action) => {
      state.currentUser = action.payload
      state.loading = false
      state.error = false
      state.isEditable = false
    },
    signinFalilure: (state, action) => {
      state.error = action.payload
      state.loading = false
      state.isEditable = false
    },

    editProfile: (state, action) => {
      state.isEditable = action.payload
    },

    updateUserStart: (state) => {
      state.loading = true
      state.isEditable = true
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload
      state.loading = false
      state.error = false
      state.isEditable = false
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload
      state.isEditable = true
      state.loading = false
    },

    deleteUserStart: (state) => {
      state.loading = true
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null
      state.loading = false
      state.error = false
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    signOutSuccess: (state) => {
      state.currentUser = null
      state.loading = false
      state.error = false
    },
  },
})

export const {
  signinStart,
  signinSuccess,
  signinFalilure,
  updateUserStart,
  updateUserSuccess,
  editProfile,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutSuccess,
} = userSlice.actions
export default userSlice.reducer
