import { createSlice } from '@reduxjs/toolkit'
import { updateAuthToken } from '@api'
const jwtToken = localStorage.getItem('jwt-token')

const initialState = {
  isLoggedIn: jwtToken ? true : false,
  isGuestUser: false,
  jwt: localStorage.getItem('jwt-token'),
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
    addJwt(state, { payload }) {
      state.isLoggedIn = true
      state.isGuestUser = false
      state.jwt = payload
      updateAuthToken(payload)
    },

    loginAsGuest(state) {
      state.isLoggedIn = true
      state.isGuestUser = true
      state.user = guestUserData
    },

    logout(state) {
      Object.assign(state, initialState)
      updateAuthToken(null)
    },

    updateProfile(state, { payload }) {
      Object.assign(state, payload)
    },
  },
})

export const userReducers = userSlice.reducer
export default userSlice.actions
