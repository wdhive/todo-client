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
const loadedTheme = localStorage.getItem('app-theme')
const initialState = {
  theme: loadedTheme === 'auto' ? getAutoTheme() : loadedTheme,
  hue: loadedHue && +loadedHue,
  collections: [],
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

    addCollection(state, { payload }) {
      state.collections.push(payload)
    },

    updateCollection(state, { payload }) {
      state.collections = state.collections.map((collection) => {
        if (collection._id === payload._id) {
          return payload
        }

        return collection
      })
    },

    deleteCollection(state, { payload }) {
      state.collections = state.collections.filter((collection) => {
        if (collection._id !== payload) return true
      })
    },
  },
})

export const settingsReducers = settingsSlice.reducer
export default settingsSlice.actions
