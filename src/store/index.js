import { configureStore } from '@reduxjs/toolkit'
import { userReducers } from './slice/user.js'

const store = configureStore({
  reducer: {
    user: userReducers,
  },
})

export default store
