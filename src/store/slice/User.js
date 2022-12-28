import createNotification from '$utils/createNotification'
import { createSlice } from '@reduxjs/toolkit'
const jwtToken = localStorage.getItem('jwt-token')

const initialState = {
  user: {},
  jwt: null,
  socketId: null,
  notifications: [],
}

const sessionState = {
  ...initialState,
  jwt: jwtToken,
  isLoggedIn: Boolean(jwtToken),
}

const userSlice = createSlice({
  name: 'user',
  initialState: sessionState,
  reducers: {
    initial() {
      return initialState
    },

    jwt(state, { payload }) {
      state.jwt = payload || null
    },

    updateSocketId(state, { payload }) {
      state.socketId = payload
    },

    updateUser(state, { payload }) {
      Object.assign(state.user, payload)
    },

    initNoti(state, { payload }) {
      state.notifications = payload
    },

    addNoti(state, { payload }) {
      state.notifications.push(payload)
      createNotification(payload)
    },

    removeNoti(state, { payload }) {
      state.notifications = state.notifications.filter((n) => n._id !== payload)
    },

    clearAllNoti(state) {
      state.notifications = state.notifications.filter(
        (n) => n.type === 'task-invitation'
      )
    },
  },
})

export const userReducers = userSlice.reducer
export default userSlice.actions
