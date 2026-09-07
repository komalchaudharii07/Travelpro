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

const AppRoutes = () => {
  return (
    <Routes>

      {/* =========================
          MAIN WEBSITE
      ========================= */}

      <Route path="/" element={<Home />} />

      <Route
        path="/explore"
        element={<Explore />}
      />

      <Route
        path="/destinations"
        element={<Destinations />}
      />

      <Route
        path="/destination/:id"
        element={<DestinationDetails />}
      />

      <Route
        path="/virtual-tours"
        element={<VirtualTours />}
      />

      <Route
        path="/gallery"
        element={<Gallery />}
      />

      {/* =========================
          AUTHENTICATION
      ========================= */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

    </Routes>
  );
};

export default AppRoutes;