import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signinStart: (state) => {
      state.loading = true
    },
    signinSuccess: (state, action) => {
      state.currentUser = action.payload
      state.loading = false
      state.error = false
    },
    signinFalilure: (state, action) => {
      state.error = action.payload
      state.loading = false
    },

    updateUserStart: (state) => {
      state.loading = true
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload
      state.loading = false
      state.error = false
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const {
  signinStart,
  signinSuccess,
  signinFalilure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} = userSlice.actions
export default userSlice.reducer
