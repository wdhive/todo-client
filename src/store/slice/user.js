import { createSlice } from '@reduxjs/toolkit'
const jwtToken = localStorage.getItem('jwt-token')

const initialState = {
  isLoggedIn: false,
  isGuestUser: false,
  user: {},
  jwt: null,
  socketId: null,
}

const sessionState = {
  ...initialState,
  isLoggedIn: jwtToken ? true : false,
  jwt: jwtToken,
}

const guestUserData = {
  name: 'Guest',
  email: 'guest@example.com',
}

const userSlice = createSlice({
  name: 'user',
  initialState: sessionState,
  reducers: {
    login(state, { payload }) {
      state.isLoggedIn = true
      state.isGuestUser = false
      state.jwt = payload
    },

    loginAsGuest(state) {
      state.isLoggedIn = true
      state.isGuestUser = true
      state.user = guestUserData
    },

    logout(state) {
      Object.assign(state, initialState)
    },

    updateJwt(state, { payload }) {
      state.jwt = payload
    },

    updateSocketId(state, { payload }) {
      state.socketId = payload
    },

    updateUser(state, { payload }) {
      Object.assign(state.user, payload)
    },
  },
})

export const userReducers = userSlice.reducer
export default userSlice.actions
