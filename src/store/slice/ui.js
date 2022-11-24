import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'uis',
  initialState: {},
  reducers: {
    setGlobalActive(state, { payload }) {
      state.globalActive = typeof payload === 'string' ? payload : null
    },
  },
})

export const uiReducers = uiSlice.reducer
export default uiSlice.actions

const hideGlobalActive = () => {
  $store(uiSlice.actions.setGlobalActive())
}

window.addEventListener('click', hideGlobalActive)
window.addEventListener('contextmenu', hideGlobalActive)
window.addEventListener('blur', hideGlobalActive)
