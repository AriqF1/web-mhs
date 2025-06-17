import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import Dashboard from "./pages/admin/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import DaftarMahasiswa from "./pages/admin/DaftarMahasiswa";
import DaftarProdi from "./pages/admin/DaftarProdi";
import DashboardPage from "./pages/admin/DashboardPage";
import DaftarDosen from "./pages/Admin/DaftarDosen";
import DaftarMatakuliah from "./pages/admin/DaftarMatkul";

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
            <Route path="index" element={<DashboardPage />} />
            <Route path="mahasiswa" element={<DaftarMahasiswa />} />
            <Route path="matkul" element={<DaftarMatakuliah />} />
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
