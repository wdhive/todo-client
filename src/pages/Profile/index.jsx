import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Theme from './Theme';
import Account from './Account';
import TaskCategories from './TaskCategories';

const Profile = () => {
  return (
    <>
      <h1>Profile Root</h1>;
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route path="theme" element={<Theme />} />
          <Route path="account" element={<Account />} />
          <Route path="categories" element={<TaskCategories />} />
          <Route path="*" element={<Navigate to="/profile" />} />
        </Route>
      </Routes>
    </>
  );
};

export default Profile;
