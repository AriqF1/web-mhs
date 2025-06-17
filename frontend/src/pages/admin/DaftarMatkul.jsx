import React, { useState, useEffect } from "react";
import Modal from "../components/organism/Modal.jsx";
import { FaEdit, FaTrash, FaSearch, FaPlus, FaEye } from "react-icons/fa";
// import MatakuliahForm from "../components/organism/MatakuliahForm.jsx";
import DetailMatakuliah from "../components/organism/DetailMatakuliah.jsx";
import { getAllMatkul } from "../../services/matkulService.js";
import { showSuccess, showCanceled } from "../../utils/sweetAlert.js";
import Swal from "sweetalert2";

const DaftarMatakuliah = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJurusan, setSelectedJurusan] = useState("");
  const [listMatakuliah, setListMatakuliah] = useState([]);

  const fetchMatkul = async () => {
    setIsLoading(true);
    try {
      const response = await getAllMatkul();
      setListMatakuliah(response);
    } catch (error) {
      console.error("Gagal memuat data matakuliah:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMatkul();
  }, []);

  const openModal = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    setModalTitle("");
    fetchMatkul();
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data ini akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        showSuccess("Matakuliah berhasil dihapus!");
        fetchMatkul();
      } else {
        showCanceled();
      }
    });
  };

  const filteredMatakuliah = listMatakuliah.filter((mk) => {
    const matchesSearch =
      mk.nama_matakuliah.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mk.kode_matakuliah.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesJurusan =
      selectedJurusan === "" || mk.jurusan === selectedJurusan;
    return matchesSearch && matchesJurusan;
  });

  const uniqueJurusan = [
    ...new Set(listMatakuliah.map((mk) => mk.jurusan).filter(Boolean)),
  ];

  return (
    <div className="flex-1 p-6 overflow-auto bg-gray-50">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Daftar Matakuliah</h1>
        <p className="text-gray-600">Kelola data matakuliah yang tersedia</p>
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
                  placeholder="Cari kode atau nama matakuliah..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <select
                value={selectedJurusan}
                onChange={(e) => setSelectedJurusan(e.target.value)}
                className="block w-full md:w-48 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Semua Jurusan</option>
                {uniqueJurusan.map((jurusan) => (
                  <option key={jurusan} value={jurusan}>
                    {jurusan}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() =>
                openModal(
                  "Tambah Matakuliah",
                  <MatakuliahForm
                    uniqueJurusan={uniqueJurusan}
                    onSubmit={closeModal} // Close and refresh after submission
                    onCancel={closeModal}
                  />
                )
              }
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center"
            >
              <FaPlus className="mr-2" />
              Tambah Matakuliah
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3">Kode Matakuliah</th>
                <th className="px-6 py-3">Nama Matakuliah</th>
                <th className="px-6 py-3">SKS</th>
                <th className="px-6 py-3">Jurusan</th>
                <th className="px-6 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMatakuliah.length > 0 ? (
                filteredMatakuliah.map((mk) => (
                  <tr key={mk.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {mk.kode_matakuliah}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {mk.nama_matakuliah}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{mk.sks}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {mk.jurusan || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() =>
                          openModal(
                            "Detail Matakuliah",
                            <DetailMatakuliah matakuliah={mk} />
                          )
                        }
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() =>
                          openModal(
                            "Edit Matakuliah",
                            <MatakuliahForm
                              initialData={mk}
                              uniqueJurusan={uniqueJurusan}
                              onSubmit={closeModal}
                              onCancel={closeModal}
                            />
                          )
                        }
                        className="text-yellow-600 hover:text-yellow-900 mr-3"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(mk.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Tidak ada data matakuliah yang sesuai dengan pencarian
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
                <span className="font-medium">{filteredMatakuliah.length}</span>{" "}
                dari{" "}
                <span className="font-medium">{listMatakuliah.length}</span>{" "}
                matakuliah
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                {/* Pagination is simplified for this example, integrate your actual pagination logic */}
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

      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        {modalContent}
      </Modal>
    </div>
  );
};

export default DaftarMatakuliah;
