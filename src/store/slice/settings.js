import { createSlice } from '@reduxjs/toolkit'
import { randomNumber } from '$utils/utils'

const getRandomHue = () => {
  return randomNumber(0, 360)
}

const getAutoTheme = () => {
  const media = matchMedia('(prefers-color-scheme: dark)')
  return `auto-${media.matches ? 'dark' : 'light'}`
}

const loadedHue = localStorage.getItem('app-theme-hue')
const initialState = {
  theme: localStorage.getItem('app-theme') ?? getAutoTheme(),
  hue: loadedHue && +loadedHue,
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setRandomHue(state) {
      state.hue = getRandomHue()
    },

    setTheme(state, { payload }) {
      state.theme = payload ?? getAutoTheme()
    },

    updateSettigns(state, { payload }) {
      Object.assign(state, payload)
    },

    updateHue(state, { payload }) {
      state.hue = payload
    },
  },
})

export const settingsReducers = settingsSlice.reducer
export default settingsSlice.actions
