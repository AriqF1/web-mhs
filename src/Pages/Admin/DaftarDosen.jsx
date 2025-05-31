import React, { useState } from "react";
import Modal from "../components/organism/Modal.jsx";
import { FaEdit, FaTrash, FaSearch, FaUserPlus, FaEye } from "react-icons/fa";
import ListDosen from "../../data/ListDosen.jsx";

const DaftarDosen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProdi, setSelectedProdi] = useState("");

  // Fungsi untuk membuka modal
  const openModal = (title, content) => {
    console.log("Modal dibuka dengan title:", title);
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };

  // Filter mahasiswa berdasarkan pencarian dan prodi
  const filteredDosen = ListDosen.filter((dsn) => {
    const matchesSearch =
      dsn.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dsn.nip.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProdi = selectedProdi === "" || dsn.prodi === selectedProdi;
    return matchesSearch && matchesProdi;
  });

  // Ekstrak prodi unik untuk dropdown filter
  const uniqueProdi = [...new Set(ListDosen.map((dsn) => dsn.prodi))];

  // Render detail dosen
  const DetailDosen = ({ dsn }) => (
    <div className="space-y-4">
      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-4xl text-gray-500">
          {dsn.nama.charAt(0)}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500">nip</h4>
          <p>{dsn.nip}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Nama</h4>
          <p>{dsn.nama}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Email</h4>
          <p>{dsn.email}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">prodi</h4>
          <p>{dsn.prodi}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Status</h4>
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              dsn.status === "Aktif"
                ? "bg-green-100 text-green-800"
                : dsn.status === "Cuti"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {dsn.status}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 p-6 overflow-auto bg-gray-50">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Daftar Dosen</h1>
        <p className="text-gray-600">Pengelola data dosen di sini.</p>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
            <div className="flex-1 flex space-x-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Cari nip atau nama..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <select
                value={selectedProdi}
                onChange={(e) => setSelectedProdi(e.target.value)}
                className="block w-full md:w-48 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Semua prodi</option>
                {uniqueProdi.map((prodi) => (
                  <option key={prodi} value={prodi}>
                    {prodi}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3">Nip</th>
                <th className="px-6 py-3">Nama</th>
                <th className="px-6 py-3">prodi</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDosen.length > 0 ? (
                filteredDosen.map((dsn) => (
                  <tr key={dsn.nip} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {dsn.nip}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 mr-3 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-semibold">
                          {dsn.nama.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {dsn.nama}
                          </div>
                          <div className="text-sm text-gray-500">
                            {dsn.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{dsn.prodi}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          dsn.status === "Aktif"
                            ? "bg-green-100 text-green-800"
                            : dsn.status === "Cuti"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {dsn.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Tidak ada data dosen yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Menampilkan{" "}
                <span className="font-medium">{filteredDosen.length}</span> dari{" "}
                <span className="font-medium">{ListDosen.length}</span> dosen
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  &laquo; Previous
                </button>
                <button className="bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Next &raquo;
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
      >
        {modalContent}
      </Modal>
    </div>
  );
};

export default DaftarDosen;
