import { Outlet } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

const Main = () => {
  return (
    <>
      <h1>Main</h1>

      <Outlet />

      <Routes>
        <Route path="tasks/*" element={<h1>Nav....</h1>} />
        <Route path="profile" element={<h1>Nav....</h1>} />
        <Route path="search" element={<h1>Nav....</h1>} />
        <Route path="notifications" element={<h1>Nav....</h1>} />
      </Routes>
    </>
  );
};

export default Main;
