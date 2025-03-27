import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/Auth/LoginPage";
import Dashboard from "./Pages/Admin/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import DaftarMahasiswa from "./Pages/Admin/DaftarMahasiswa";
import DetailMahasiswa from "./Pages/Admin/DetailMahasiswa";

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
            <Route path="mahasiswa" element={<DaftarMahasiswa />} />
            <Route path="detail" element={<DetailMahasiswa />} />
          </Route>
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
