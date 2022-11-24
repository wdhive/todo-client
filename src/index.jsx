import React from 'react'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import className from 'classnames'
import store from '$store'
import api from '$api'

window.cn = className

import '$styles/index.scss'
import App from './App'
import ErrorBoundary from '$src/ErrorBoundary'
import ErrorHandler from '$components/ErrorHandler'

const rootElement = document.getElementById('Root')
const root = createRoot(rootElement)

api('get', '/ping')
root.render(
  <ErrorBoundary element={<ErrorHandler />}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </ErrorBoundary>
)
