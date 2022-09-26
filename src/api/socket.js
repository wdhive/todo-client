import { io } from 'socket.io-client';

let socket = io(`http://localhost:8000/v1/tasks-socket`, {
  auth: {
    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMmQ3NzZmOGY3YTUwNmI1MzFhNjFjZiIsImlhdCI6MTY2NDAyNTI4NSwiZXhwIjoxNjcxODAxMjg1fQ.GL_LAIZSbKjv1g_so-TGUQkDTxIXI18P9-BnsTKek0k`,
  },
  reconnection: true,
  reconnectionDelay: 500,
  reconnectionDelayMax: 2500,
  reconnectionAttempts: Infinity,
});

socket.onAny((ev, data) => console.log(ev, data))