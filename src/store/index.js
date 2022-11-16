import { configureStore } from '@reduxjs/toolkit'
import { userReducers } from './slice/user'
import { settingsReducers } from './slice/settings'
import { taskReducers } from './slice/tasks'

const store = configureStore({
  reducer: {
    user: userReducers,
    tasks: taskReducers,
    settings: settingsReducers,
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

export default store
