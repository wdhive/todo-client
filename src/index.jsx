import React from 'react'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import ErrorBoundary from 'error-boundary-react'
import className from 'classnames'
import store from '$store'
import { methods } from '$api/index'

window.cn = className

import '$styles/index.scss'
import App from './App'
import AppError from '$components/Error'

const rootElement = document.getElementById('Root')
const root = createRoot(rootElement)

methods.get('/ping')
root.render(
  <ErrorBoundary element={<AppError />}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </ErrorBoundary>
)
