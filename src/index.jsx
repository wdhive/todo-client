import React from 'react'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import './styles/index.scss'
import App from './App'
import store from '$store'

import ErrorBoundary from '$src/ErrorBoundary'
import ErrorHandler from '$components/ErrorHandler'

import className from 'classnames'
import useApi from '$api/useApi'
import useApiOnce from '$api/useApiOnce'

window.cn = className
window.useApi = useApi
window.useApiOnce = useApiOnce
window.$store = store.dispatch

const rootElement = document.getElementById('Root')
const root = createRoot(rootElement)

root.render(
  <ErrorBoundary element={<ErrorHandler />}>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </ErrorBoundary>
)
