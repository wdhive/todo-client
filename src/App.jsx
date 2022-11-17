import react, { Suspense, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Loading from '$components/Loading'
import NotFound from '$pages/NotFound'

const MainLayout = react.lazy(() => import('$pages/Main/Layout'))
const LandingPage = react.lazy(() => import('$pages/LandingPage'))
const HelpSupport = react.lazy(() => import('$pages/HelpSupport'))
const AboutUs = react.lazy(() => import('$pages/AboutUs'))
const Signin = react.lazy(() => import('$pages/Signin'))
const Signup = react.lazy(() => import('$pages/Signup'))

const App = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const themeHue = useSelector((state) => state.settings.hue)
  const extraAlert = useSelector((state) => state.extra.alert)
  const alertDone = useRef(false)

  useEffect(() => {
    if (!extraAlert || alertDone.current) return
    alertDone.current = true
    alert(extraAlert.message)
    extraAlert.action && $store(extraAlert.action)
  }, [extraAlert])

  return (
    <>
      {themeHue && (
        <style>
          {`:root {
              --hue: ${themeHue};
            }`}
        </style>
      )}

      {/* {extraAlert && <h1>Error</h1>} */}

      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="about" element={<AboutUs />} />
            <Route path="help" element={<HelpSupport />} />
            <Route path="support" element={<Navigate replace to="/help" />} />

            {isLoggedIn ? (
              <Route path="/*" element={<MainLayout />} />
            ) : (
              <>
                <Route path="/" element={<LandingPage />} />
                <Route
                  path="login"
                  element={<Navigate replace to="/signin" />}
                />
                <Route
                  path="register"
                  element={<Navigate replace to="/signup" />}
                />

                <Route path="signin" element={<Signin />} />
                <Route path="signup" element={<Signup />} />

                <Route
                  path="tasks/*"
                  element={<Navigate replace to="/login" />}
                />
                <Route
                  path="profile/*"
                  element={<Navigate replace to="/login" />}
                />
                <Route
                  path="search/*"
                  element={<Navigate replace to="/login" />}
                />
                <Route
                  path="notifications/*"
                  element={<Navigate replace to="/login" />}
                />
                <Route path="*" element={<NotFound />} />
              </>
            )}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
