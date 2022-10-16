import react, { Suspense, useRef } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Loading from '@com/Loading'
import NotFound from '@pages/NotFound'
import * as utils from '@src/utils/utils'
const Redirect = to => <Navigate replace to={to} />

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

const App = () => {
  const isLoggedIn = false
  const randomHue = useRef(utils.randomNumber(360))

  return (
    <main>
      {/* {isLoggedIn || (
        <style>
          {`:root {
        --hue: ${randomHue.current};
         }`}
        </style>
      )} */}

      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <Routes>
            {isLoggedIn ? (
              <Route path="/" element={<MainPage />}>
                <Route index element={<Redirect to="/tasks" />} />
                <Route path="tasks/*" element={<Task />} />
                <Route path="profile/*" element={<Profile />} />
                <Route path="search" element={<Search />} />
                <Route path="notifications" element={<Notifications />} />

                <Route path="login/*" element={<Redirect to="/profile" />} />
                <Route path="signin/*" element={<Redirect to="/profile" />} />
                <Route path="signup/*" element={<Redirect to="/profile" />} />
                <Route path="register/*" element={<Redirect to="/profile" />} />
              </Route>
            ) : (
              <>
                <Route path="/" element={<LandingPage />} />
                <Route path="login" element={<Redirect to="/signin" />} />
                <Route path="signin" element={<Signin />} />
                <Route path="signup" element={<Signup />} />
                <Route path="register" element={<Signup />} />

                <Route path="tasks/*" element={<Redirect to="/login" />} />
                <Route path="profile/*" element={<Redirect to="/login" />} />
                <Route path="search/*" element={<Redirect to="/login" />} />
                <Route
                  path="notifications/*"
                  element={<Redirect to="/login" />}
                />
              </>
            )}

            <Route path="about-us" element={<AboutUs />} />
            <Route path="help-support" element={<HelpSupport />} />
            <Route path="404" element={<NotFound />} />
            <Route path="*" element={<Redirect to="/404" />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </main>
  )
}

export default App
