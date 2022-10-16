import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  isGuestUser: false,
  user: null,
}

const guestUserData = {
  name: 'Guest',
  email: 'guest@example.com',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, { payload }) {
      state.isLoggedIn = true
      state.isGuestUser = false
      state.user = payload
    },

    loginAsGuest(state) {
      state.isLoggedIn = true
      state.isGuestUser = true
      state.user = guestUserData
    },

    logout(state) {
      Object.assign(state, initialState)
    },

    updateProfile(state, { payload }) {
      Object.assign(state, payload)
    },
  },
})

export const userReducers = userSlice.reducer
export default userSlice.actions
