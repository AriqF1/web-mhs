import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/Auth/LoginPage";
import Dashboard from "./Pages/Admin/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Halaman Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Halaman Admin dengan Proteksi */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
