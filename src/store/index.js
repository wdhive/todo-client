import { configureStore } from '@reduxjs/toolkit'
import { userReducers } from './slice/user'
import { settingsReducers } from './slice/settings'
import { taskReducers } from './slice/tasks'
import { extraReducers } from './slice/extra'

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
