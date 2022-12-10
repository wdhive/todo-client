import { configureStore } from '@reduxjs/toolkit'
import { userReducers } from './slice/User'
import { settingsReducers } from './slice/Settings'
import { taskReducers } from './slice/Tasks'
import { extraReducers } from './slice/Extra'

const store = configureStore({
  reducer: {
    user: userReducers,
    tasks: taskReducers,
    settings: settingsReducers,
    extra: extraReducers,
  },
})

window.$store = store.dispatch
export default store
