import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminLogin from "./pages/adminlogin";

import Builder from "./pages/Builder";
import Profile from "./pages/Profile";

import AdminDashboard from "./pages/AdminDashboard";

import PublicPortfolio from "./pages/PublicPortfolio";

import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ========= AUTH ========= */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* ========= USER MAIN (BUILDER) ========= */}
        <Route
          path="/builder"
          element={
            <PrivateRoute role="user">
              <Builder />
            </PrivateRoute>
          }
        />

        {/* ========= ADMIN ========= */}
        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* ========= PROFILE ========= */}
        <Route
          path="/profile"
          element={
            <PrivateRoute role="user">
              <Profile />
            </PrivateRoute>
          }
        />

        {/* ========= PUBLIC PORTFOLIO ========= */}
        <Route path="/portfolio/:id" element={<PublicPortfolio />} />
      </Routes>
    </BrowserRouter>
  );
}
