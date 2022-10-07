import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import LandingPage from "../pages/LandingPage";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import ChangePassword from "../pages/ChangePassword";
import EmailVerify from "../pages/EmailVerify";
import CreateTask from "../pages/CreateTask";
import Profile from "../pages/Profile";
import Notification from "../pages/Notification";
import NotFound from "../pages/NotFound";

const InitialApp = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="landing" element={<LandingPage />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="email-verify" element={<EmailVerify />} />
          <Route path="create-task" element={<CreateTask />} />
          <Route path="profile" element={<Profile />} />
          <Route path="notification" element={<Notification />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default InitialApp;
