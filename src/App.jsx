import react, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ErrorBoundary from '@src/ErrorBoundary'
import Loading from '@com/Loading'
import ErrorHandler from '@com/ErrorHandler'
import NotFound from '@pages/NotFound'

const LandingPage = react.lazy(() => import('@pages/LandingPage'))
const HelpSupport = react.lazy(() => import('@pages/HelpSupport'))
const AboutUs = react.lazy(() => import('@pages/AboutUs'))
const Signin = react.lazy(() => import('@pages/Signin'))
const Signup = react.lazy(() => import('@pages/Signup'))

const MainPage = react.lazy(() => import('@pages/Main'))
const Task = react.lazy(() => import('@pages/Task'))
const Profile = react.lazy(() => import('@pages/Profile'))
const Search = react.lazy(() => import('@pages/Main/Search'))
const Notifications = react.lazy(() => import('@pages/Main/Notifications'))

useSelector

const App = () => {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn)
  const themeHue = useSelector(state => state.settings.hue)

  return (
    <main>
      {themeHue && !isLoggedIn && (
        <style>
          {`:root {
              --hue: ${themeHue};
            }`}
        </style>
      )}

      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <ErrorBoundary element={<ErrorHandler />}>
            <Routes>
              <Route path="about-us" element={<AboutUs />} />
              <Route path="help-support" element={<HelpSupport />} />

              <Route
                path="about"
                element={<Navigate replace to="/about-us" />}
              />
              <Route path="us" element={<Navigate replace to="/about-us" />} />
              <Route
                path="help"
                element={<Navigate replace to="/help-support" />}
              />
              <Route
                path="support"
                element={<Navigate replace to="/help-support" />}
              />

              {isLoggedIn ? (
                <Route path="/" element={<MainPage />}>
                  <Route index element={<Navigate replace to="/tasks" />} />
                  <Route path="tasks/*" element={<Task />} />
                  <Route path="profile/*" element={<Profile />} />
                  <Route path="search" element={<Search />} />
                  <Route path="notifications" element={<Notifications />} />

                  <Route path="login/*" element={<Navigate replace to="/" />} />
                  <Route
                    path="signin/*"
                    element={<Navigate replace to="/" />}
                  />
                  <Route
                    path="signup/*"
                    element={<Navigate replace to="/" />}
                  />
                  <Route
                    path="register/*"
                    element={<Navigate replace to="/" />}
                  />
                </Route>
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
                </>
              )}

              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </Suspense>
      </BrowserRouter>
    </main>
  )
}

export default App
