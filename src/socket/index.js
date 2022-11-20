import { io } from 'socket.io-client'
import store from '$store'
import subscribe from '$store/subscribe'
import userSlice from '$slice/user'
import socketEvent from './socketEvent'

let socket = null

const runListner = (event, data) => {
  const handler = socketEvent[event]
  if (!(handler instanceof Function)) {
    return console.warn('No handler found for ' + event)
  }

  handler(data.data ?? data)
}

const connect = () => {
  if (socket) {
    return console.log('Socket Already Connected')
  }

  const token = store.getState().user.jwt
  const soc = io('https://baby-todo.onrender.com', {
    auth: {
      token,
      reconnection: true,
      reconnectionDelay: 500,
      reconnectionDelayMax: 2500,
      reconnectionAttempts: Infinity,
    },
  })

  soc.on('connect', () => {
    socket = soc
    // $store(userSlice.updateSocketId(soc.id))
    runListner('connect', soc)
  })

  soc.on('disconnect', () => {
    runListner('disconnect')
  })

  soc.onAny((...args) => {
    runListner(...args)
  })
}

subscribe(
  (state) => state.user.jwt,
  (token) => {
    if (!token && socket) {
      socket.disconnect()
      $store(userSlice.updateSocketId(null))
    }

    if (token && !socket) {
      connect()
    }
  }
)
