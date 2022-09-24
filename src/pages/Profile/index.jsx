import { Routes, Route, Navigate } from 'react-router-dom';
import ProfileRoot from './Root';
import Theme from './Theme';
import Account from './Account';
import TaskCategories from './TaskCategories';

const Profile = () => {
  return (
    <>
      <ProfileRoot />
      <Routes>
        <Route path="theme" element={<Theme />} />
        <Route path="account" element={<Account />} />
        <Route path="categories" element={<TaskCategories />} />
        <Route path=":notInUse/*" element={<Navigate to="/profile" />} />
      </Routes>
    </>
  );
};

export default Profile;
