import react, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ErrorBoundary from '@src/ErrorBoundary'
import Loading from '@com/Loading'
import ErrorHandler from '@com/ErrorHandler'
import NotFound from '@pages/NotFound'

const MainLayout = react.lazy(() => import('@pages/Main/Layout'))
const LandingPage = react.lazy(() => import('@pages/LandingPage'))
const HelpSupport = react.lazy(() => import('@pages/HelpSupport'))
const AboutUs = react.lazy(() => import('@pages/AboutUs'))
const Signin = react.lazy(() => import('@pages/Signin'))
const Signup = react.lazy(() => import('@pages/Signup'))

const App = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const themeHue = useSelector((state) => state.settings.hue)

  return (
    <>
      {themeHue && (
        <style>
          {`:root {
              --hue: ${themeHue};
            }`}
        </style>
      )}

      <BrowserRouter>
        <ErrorBoundary element={<ErrorHandler />}>
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
        </ErrorBoundary>
      </BrowserRouter>
    </>
  )
}

export default App
