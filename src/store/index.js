import { configureStore } from '@reduxjs/toolkit'
import { userReducers } from './slice/user'
import { settingsReducers } from './slice/settings'
import { taskReducers } from './slice/tasks'
import { extraReducers } from './slice/extra'
import { uiReducers } from './slice/ui'

const store = configureStore({
  reducer: {
    user: userReducers,
    tasks: taskReducers,
    settings: settingsReducers,
    extra: extraReducers,
    ui: uiReducers,
  },
})

export const subscribe = (stateFn, listner) => {
  let prevState
  const internalListner = (state = store.getState()) => {
    const target = stateFn(state)

    if (prevState !== target) {
      prevState = target
      listner(target)
    }
  }

  internalListner()
  store.subscribe(() => internalListner())
}

window.$store = store.dispatch
export default store
