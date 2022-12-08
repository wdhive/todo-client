import React from 'react'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import ErrorBoundary from 'error-boundary-react'
import className from 'classnames'
import store from '$store'
import api from '$api'

window.cn = className

import '../css-reset'
import '$styles/index.scss'
import App from './App'
import AppError from '$components/Error'

const rootElement = document.getElementById('Root')
const root = createRoot(rootElement)

api('get', '/ping')
root.render(
  <ErrorBoundary element={<AppError />}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </ErrorBoundary>
)
