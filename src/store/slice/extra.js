import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const extraSlice = createSlice({
  name: 'extras',
  initialState,
  reducers: {
    alert(state, { payload }) {
      state.alert = payload
    },
  },
})

export const extraReducers = extraSlice.reducer
export default extraSlice.actions
