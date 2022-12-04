import react, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Effect from './Effect'
import Loading from '$components/Loading'
import Alert from '$components/Alert'
import Error404 from '$components/Error404'

const MainLayout = react.lazy(() => import('$pages/Main/Layout'))
const LandingPage = react.lazy(() => import('$pages/LandingPage'))
const HelpSupport = react.lazy(() => import('$pages/HelpSupport'))
const AboutUs = react.lazy(() => import('$pages/AboutUs'))
const Signin = react.lazy(() => import('$pages/Signin'))
const Signup = react.lazy(() => import('$pages/Signup'))

const App = () => {
  const jwt = useSelector((state) => state.user.jwt)
  const themeHue = useSelector((state) => state.settings.hue)
  const extraAlert = useSelector((state) => state.extra.alert)

  return (
    <>
      <Effect hue={themeHue} jwt={jwt} />

      {themeHue && (
        <style>
          {`:root {
              --hue: ${themeHue};
            }`}
        </style>
      )}

      {extraAlert && (
        <Alert message={extraAlert.message} action={extraAlert.action} />
      )}

      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="about" element={<AboutUs />} />
            <Route path="help" element={<HelpSupport />} />
            <Route path="support" element={<Navigate replace to="/help" />} />

            {jwt ? (
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
                <Route path="*" element={<Error404 />} />
              </>
            )}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
