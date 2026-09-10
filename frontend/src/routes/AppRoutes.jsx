import { Routes, Route } from "react-router-dom";

// Main pages
import Home from "../pages/Home";
import Explore from "../pages/Explore";
import Destinations from "../pages/Destinations";
import DestinationDetails from "../pages/DestinationDetails";
import VirtualTours from "../pages/VirtualTours";
import Gallery from "../pages/Gallery";

// Authentication pages
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";

// Protected User / Admin pages
import Profile from "../pages/Profile";
import AdminDashboard from "../pages/AdminDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/destinations" element={<Destinations />} />
<Route path="/destination/:id" element={<DestinationDetails />} />
<Route path="/virtual-tours" element={<VirtualTours />} />
<Route path="/virtual-tours/:id" element={<VirtualTours />} />
<Route path="/gallery" element={<Gallery />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
};

export default AppRoutes;