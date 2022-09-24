import react, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import NotFound from './pages/NotFound';
const LandingPage = react.lazy(() => import('./pages/LandingPage'));
const HelpSupport = react.lazy(() => import('./pages/HelpSupport'));
const AboutUs = react.lazy(() => import('./pages/AboutUs'));
const Signin = react.lazy(() => import('./pages/Signin'));
const Signup = react.lazy(() => import('./pages/Signup'));

const MainPage = react.lazy(() => import('./pages/Main'));
const Task = react.lazy(() => import('./pages/Task'));
const Profile = react.lazy(() => import('./pages/Profile'));
const Search = react.lazy(() => import('./pages/Main/Search'));
const Notifications = react.lazy(() => import('./pages/Main/Notifications'));

const App = () => {
  const isLoggedIn = true;

  return (
    <main>
      <Suspense fallback={<h1>Loading...</h1>}>
        <BrowserRouter>
          <Routes>
            {isLoggedIn ? (
              <Route path="/" element={<MainPage />}>
                <Route index element={<Navigate to="/tasks" />} />
                <Route path="tasks/*" element={<Task />} />
                <Route path="profile/*" element={<Profile />} />
                <Route path="search" element={<Search />} />
                <Route path="notifications" element={<Notifications />} />

                <Route path="login/*" element={<Navigate to="/profile" />} />
                <Route path="signin/*" element={<Navigate to="/profile" />} />
                <Route path="signup/*" element={<Navigate to="/profile" />} />
                <Route path="register/*" element={<Navigate to="/profile" />} />
              </Route>
            ) : (
              <>
                <Route path="/" element={<LandingPage />} />
                <Route path="login" element={<Signin />} />
                <Route path="signin" element={<Signin />} />
                <Route path="signup" element={<Signup />} />
                <Route path="register" element={<Signup />} />

                <Route path="tasks/*" element={<Navigate to="/login" />} />
                <Route path="profile/*" element={<Navigate to="/login" />} />
                <Route path="search/*" element={<Navigate to="/login" />} />
                <Route
                  path="notifications/*"
                  element={<Navigate to="/login" />}
                />
              </>
            )}

            <Route path="about-us" element={<AboutUs />} />
            <Route path="help-support" element={<HelpSupport />} />
            <Route path="404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </main>
  );
};

export default App;
