import react, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const MainPage = react.lazy(() => import('./pages/Main'));
const LandingPage = react.lazy(() => import('./pages/LandingPage'));
const AboutUs = react.lazy(() => import('./pages/AboutUs'));
const HelpSupport = react.lazy(() => import('./pages/HelpSupport'));
import NotFound from './pages/NotFound';

const Login = react.lazy(() => './pages/Login');
const Signup = react.lazy(() => import('./pages/Signup'));

const Task = react.lazy(() => import('./pages/Task'));
const TaskNew = react.lazy(() => import('./pages/Task/TaskNew'));
const TaskUpdate = react.lazy(() => import('./pages/Task/TaskUpdate'));

const Profile = react.lazy(() => import('./pages/Profile/Profile'));
const ProfileTheme = react.lazy(() => import('./pages/Profile/Theme'));
const ProfileSettings = react.lazy(() => import('./pages/Profile/Account'));
const ProfileTaskCategories = react.lazy(() =>
  import('./pages/Profile/TaskCategories')
);

const Search = react.lazy(() => import('./pages/Search'));
const Notifications = react.lazy(() => import('./pages/Notifications'));

const App = () => {
  const isLoggedIn = true;

  return (
    <main>
      <Suspense fallback={<h1>Loading...</h1>}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/*"
              element={isLoggedIn ? <MainPage /> : <LandingPage />}
            >
              <Route index element={<Navigate to="tasks" />} />

              <Route path="tasks" element={<Task />}>
                <Route path="new" element={<TaskNew />} />
                <Route path=":taskId" element={<TaskUpdate />} />
              </Route>

              <Route path="profile">
                <Route index element={<Profile />} />
                <Route path="theme" element={<ProfileTheme />} />
                <Route path="account" element={<ProfileSettings />} />
                <Route path="categories" element={<ProfileTaskCategories />} />
              </Route>

              <Route path="search" element={<Search />} />

              <Route path="notifications" element={<Notifications />} />

              <Route path="*" element={<Navigate to="/404" />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
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
