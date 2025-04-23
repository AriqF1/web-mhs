import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/Auth/LoginPage";
import Dashboard from "./Pages/Admin/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import DaftarMahasiswa from "./Pages/Admin/DaftarMahasiswa";
import DaftarProdi from "./Pages/Admin/DaftarProdi";
import DashboardHome from "./Pages/Admin/DashboardHome";
import DaftarDosen from "./Pages/Admin/DaftarDosen";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Halaman Login */}
        <Route path="/" element={<LoginPage />} />

        {/* Halaman Admin dengan Proteksi */}
        <Route path="/admin" element={<ProtectedRoute />}>
          {/* Dashboard sebagai Layout */}
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="index" element={<DashboardHome />} />
            <Route path="mahasiswa" element={<DaftarMahasiswa />} />
            <Route path="detail" element={<DaftarProdi />} />
            <Route path="dosen" element={<DaftarDosen />} />
          </Route>
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
