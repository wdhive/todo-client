import { io } from 'socket.io-client'
import store from '$store'
import userSlice from '$slice/User'
import socketEvent from './socketEvent'
import { baseURL } from '$api/react'
let socket = undefined

const runListner = (event, data) => {
  const handler = socketEvent[event]
  if (!(handler instanceof Function)) {
    return console.warn('No handler found for ' + event)
  }

  handler(data?.data ?? data)
}

export const connect = () => {
  if (socket) return console.log('Socket Already Connected')
  socket = true

  const token = store.getState().user.jwt
  const soc = io(baseURL, {
    auth: {
      token: `Bearer ${token}`,
      reconnection: true,
      reconnectionDelay: 500,
      reconnectionDelayMax: 2500,
      reconnectionAttempts: Infinity,
    },
  })

  soc.on('connect', () => {
    socket = soc
    $store(userSlice.updateSocketId(soc.id))
    runListner('connect', soc)
  })

  soc.on('disconnect', () => {
    socket = undefined
    $store(userSlice.updateSocketId(null))
    runListner('disconnect')
  })

  soc.onAny(runListner)
}

export default (token) => {
  try {
    if (!socket && token) connect()
    if (socket && !token) socket?.disconnect()
  } catch {
    console.error('Something went wrong in setSocket')
  }
}
