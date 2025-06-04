import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaPlusCircle,
  FaGraduationCap,
  FaUsers,
} from "react-icons/fa";
import AddForm from "./molecules/AddForm.jsx";
import Modal from "./organism/Modal.jsx";
import React, { useState } from "react";
import ListProdi from "../../data/ListProdi.jsx";
import Swal from "sweetalert2";

const DataProdi = ({ filteredProdi }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const handleDelete = (kode) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data ini akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedProdi = filteredProdi.filter(
          (prodi) => prodi.kode !== kode
        );
        setFilteredProdi(updatedProdi);
        Swal.fire("Dihapus!", "Data telah dihapus.", "success");
      } else {
        Swal.fire("Dibatalkan", "Data tidak dihapus", "info");
      }
    });
  };

  // Function to open modal
  const openModal = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };
  return (
    <div className="flex-1 p-6 overflow-auto bg-gray-50">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Program Studi</h1>
        <p className="text-gray-600">
          Kelola data program studi dan jumlah mahasiswa
        </p>
      </div>

      <div className="rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
            <div className="flex-1 flex space-x-2"></div>
            <button
              onClick={() => openModal("Tambah Program Studi", <AddForm />)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center"
            >
              <FaPlusCircle className="mr-2" />
              Tambah Program Studi
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3">Kode</th>
                <th className="px-6 py-3">Nama Program Studi</th>
                <th className="px-6 py-3">Jenjang</th>
                <th className="px-6 py-3">Akreditasi</th>
                <th className="px-6 py-3">Jumlah Mahasiswa</th>
                <th className="px-6 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProdi.length > 0 ? (
                filteredProdi.map((prodi) => (
                  <tr key={prodi.kode} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {prodi.kode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 mr-3 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-semibold">
                          {prodi.kode.charAt(0)}
                        </div>
                        <div className="font-medium text-gray-900">
                          {prodi.nama}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaGraduationCap className="mr-2 text-blue-500" />
                        {prodi.jenjang}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          prodi.akreditasi === "A"
                            ? "bg-green-100 text-green-800"
                            : prodi.akreditasi === "B"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {prodi.akreditasi}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaUsers className="mr-2 text-gray-500" />
                        {prodi.jumlahMahasiswa} Mahasiswa
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() =>
                          openModal("Edit Program Studi", <AddForm />)
                        }
                        className="text-yellow-600 hover:text-yellow-900 mr-4"
                      >
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(prodi.kode)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Tidak ada data program studi yang sesuai dengan pencarian
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Menampilkan{" "}
                <span className="font-medium">{filteredProdi.length}</span> dari{" "}
                <span className="font-medium">{ListProdi.length}</span> program
                studi
              </p>
            </div>

            <div className="flex space-x-1 items-center">
              <span className="text-sm text-gray-700">Total Mahasiswa:</span>
              <span className="text-lg font-semibold text-blue-600">
                {filteredProdi.reduce(
                  (total, prodi) => total + prodi.jumlahMahasiswa,
                  0
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Peta Distribusi */}

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

export default DataProdi;
