import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserGraduate,
  FaUniversity,
  FaBook,
  FaChalkboardTeacher,
  FaTasks,
  FaClipboardCheck,
  FaCog,
} from "react-icons/fa";

import { useAuthStateContext } from "../../../../AuthContext";

const Sidebar = () => {
  const { user } = useAuthStateContext();
  return (
    <aside
      id="sidebar"
      className="bg-blue-900 text-white h-full transition-all duration-300 w-20 lg:w-64 shadow-xl"
    >
      <div className="flex justify-center items-center p-6 border-b border-blue-700">
        <span className="text-2xl font-bold hidden lg:flex items-center gap-2 text-white">
          DASHBOARD ADMIN
        </span>
        <span className="text-xl font-bold lg:hidden">Admin</span>
      </div>

      <nav className="p-4 space-y-1">
        {/* Dashboard */}
        {user.permission.includes("dashboard.page") && (
          <NavLink
            to="/admin/dashboard/index"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive ? "bg-blue-700 shadow-md" : "hover:bg-blue-800"
              }`
            }
          >
            <FaTachometerAlt className="text-xl" />
            <span className="menu-text hidden lg:inline font-medium">
              Dashboard
            </span>
          </NavLink>
        )}

        {/* Mahasiswa */}
        {user.permission.includes("mahasiswa.page") && (
          <NavLink
            to="/admin/dashboard/mahasiswa"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive ? "bg-blue-700 shadow-md" : "hover:bg-blue-800"
              }`
            }
          >
            <FaUserGraduate className="text-xl" />
            <span className="menu-text hidden lg:inline font-medium">
              Mahasiswa
            </span>
          </NavLink>
        )}
        {/* Prodi */}
        {user.permission.includes("prodi.page") && (
          <NavLink
            to="/admin/dashboard/detail"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive ? "bg-blue-700 shadow-md" : "hover:bg-blue-800"
              }`
            }
          >
            <FaUniversity className="text-xl" />
            <span className="menu-text hidden lg:inline font-medium">
              Prodi
            </span>
          </NavLink>
        )}

        {/* Matkul */}
        {user.permission.includes("matkul.page") && (
          <NavLink
            to="/admin/dashboard/matkul"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive ? "bg-blue-700 shadow-md" : "hover:bg-blue-800"
              }`
            }
          >
            <FaBook className="text-xl" />
            <span className="menu-text hidden lg:inline font-medium">
              Mata Kuliah
            </span>
          </NavLink>
        )}
        {/* Dosen */}
        {user.permission.includes("dosen.page") && (
          <NavLink
            to="/admin/dashboard/dosen"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive ? "bg-blue-700 shadow-md" : "hover:bg-blue-800"
              }`
            }
          >
            <FaChalkboardTeacher className="text-xl" />
            <span className="menu-text hidden lg:inline font-medium">
              Dosen
            </span>
          </NavLink>
        )}

        {user.permission.includes("rencana-studi.page") && (
          <NavLink
            to="/admin/dashboard/rencana-studi"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive ? "bg-blue-700 shadow-md" : "hover:bg-blue-800"
              }`
            }
          >
            <FaClipboardCheck className="text-xl" />
            <span className="menu-text hidden lg:inline font-medium">
              Kelas
            </span>
          </NavLink>
        )}

        {/* Pengaturan */}
        <div className="pt-6 mt-6 border-t border-blue-700">
          <div className="px-4 py-2 text-blue-300 text-xs uppercase font-semibold hidden lg:block">
            Admin Tools
          </div>

          <NavLink
            to="/admin/dashboard/settings"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive ? "bg-blue-700 shadow-md" : "hover:bg-blue-800"
              }`
            }
          >
            <FaCog className="text-xl" />
            <span className="menu-text hidden lg:inline font-medium">
              Pengaturan
            </span>
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
