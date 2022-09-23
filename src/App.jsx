import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/Main';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import AboutUs from './pages/AboutUs';
import HelpSupport from './pages/HelpSupport';

import Login from './pages/Login';
import Signup from './pages/Signup';

import Task from './pages/Task';
import TaskNew from './pages/Task/TaskNew';
import TaskUpdate from './pages/Task/TaskUpdate';

import Profile from './pages/Profile/Profile';
import ProfileTheme from './pages/Profile/Theme';
import ProfileSettings from './pages/Profile/Account';
import ProfileTaskCategories from './pages/Profile/TaskCategories';

import Search from './pages/Search';
import Notifications from './pages/Notifications';

const App = () => {
  const isLoggedIn = true;

  return (
    <main>
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
    </main>
  );
};

export default App;
