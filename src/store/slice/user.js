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
      state.isLoggedIn = false
      state.isGuestUser = false
      state.user = null
    },

    updateProfile(state, { payload }) {
      for (let key in payload) {
        const value = payload[key]
        state.user[key] = value
      }
    },
  },
})

export const userReducers = userSlice.reducer
export default userSlice.actions
