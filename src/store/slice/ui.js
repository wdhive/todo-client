import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'uis',
  initialState: {},
  reducers: {
    setGlobalActive(state, { payload }) {
      state.globalActive = payload
    },
  },
})

export const uiReducers = uiSlice.reducer
export default uiSlice.actions

const hideGlobalActive = () => {
  $store(uiSlice.actions.setGlobalActive())
}

document.addEventListener('click', hideGlobalActive)
document.addEventListener('contextmenu', hideGlobalActive)
document.addEventListener('visibilitychange', hideGlobalActive)
