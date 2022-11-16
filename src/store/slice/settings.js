import { createSlice } from '@reduxjs/toolkit'
import { randomNumber } from '$src/utils/utils'

const getRandomHue = () => {
  return randomNumber(0, 360)
}

const initialState = {}

const settingsSlice = createSlice({
  name: 'settings',
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
