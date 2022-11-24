import { createSlice } from '@reduxjs/toolkit'
const jwtToken = localStorage.getItem('jwt-token')

const initialState = {
  user: {},
  jwt: null,
  socketId: null,
}

const sessionState = {
  ...initialState,
  isLoggedIn: Boolean(jwtToken),
  jwt: jwtToken,
}

const userSlice = createSlice({
  name: 'user',
  initialState: sessionState,
  reducers: {
    jwt(state, { payload }) {
      state.jwt = payload || null
    },

    logout(state) {
      Object.assign(state, initialState)
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
