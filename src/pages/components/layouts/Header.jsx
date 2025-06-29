import React, { useState } from "react";
import { FaUserCircle, FaSignOutAlt, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Header() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Logout",
      text: "Apakah Anda yakin ingin keluar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, keluar",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/"); // Redirect ke halaman login
      } else {
        Swal.fire("Dibatalkan", "Anda tetap berada di dashboard", "info");
      }
    });
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto">
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-xl font-bold text-blue-600"></h1>

          <div className="relative">
            <button
              onClick={toggleProfileMenu}
              className="flex items-center focus:outline-none group"
            >
              <span className="mr-3 text-gray-700 group-hover:text-blue-600">
                Frimawan
              </span>
              <img
                src="https://i.pravatar.cc/150?img=6"
                className="w-10 h-10 rounded-full border-2 border-gray-200 group-hover:border-blue-500"
                alt="Profile"
              />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-100">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm text-gray-500">Login sebagai</p>
                  <p className="font-medium">frimawan@admin.ac.id</p>
                </div>

                <a
                  href="#profile"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50"
                >
                  <FaUserCircle className="mr-3 text-gray-500" />
                  Profil Saya
                </a>
                <a
                  href="#settings"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50"
                >
                  <FaCog className="mr-3 text-gray-500" />
                  Pengaturan
                </a>
                <div className="border-t border-gray-100 mt-2"></div>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-blue-50 text-left"
                >
                  <FaSignOutAlt className="mr-3 text-gray-500" />
                  Keluar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
