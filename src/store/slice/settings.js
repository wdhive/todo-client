import { createSlice } from '@reduxjs/toolkit'
import { randomNumber } from '@src/utils/utils'

const getRandomHue = () => {
  return randomNumber(0, 360)
}

const initialState = {
  theme: 'light',
  hue: false,
}

const settingsSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRandomHue(state) {
      state.hue = getRandomHue()
    },

    updateSettigns(state, { payload }) {
      Object.assign(state, payload)
    },
  },
})

export const settingsReducers = settingsSlice.reducer
export default settingsSlice.actions
