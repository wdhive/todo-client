import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tasks: [],
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, { payload }) {
      state.tasks.push(payload)
    },
    initTasks(state, { payload }) {
      state.tasks = payload
    },
  },
})

export const taskReducers = taskSlice.reducer
export default taskSlice.actions
