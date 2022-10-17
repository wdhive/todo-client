import { configureStore } from '@reduxjs/toolkit'
import { userReducers } from './slice/user'
import { settingsReducers } from './slice/settings'

const store = configureStore({
  reducer: {
    user: userReducers,
    settings: settingsReducers,
  },
})

export default store
