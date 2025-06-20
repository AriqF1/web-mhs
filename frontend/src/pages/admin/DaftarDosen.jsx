import React, { useState, useEffect } from "react";
import Modal from "../components/organism/Modal.jsx";
import { FaEdit, FaTrash, FaSearch, FaUserPlus, FaEye } from "react-icons/fa";
import {
  getAllDosen,
  storeDosen,
  deleteDosen,
  updateDosen,
} from "../../utils/apis/DosenApi.jsx";
import DetailDosen from "../components/organism/DetailDosen.jsx";
import DosenForm from "../components/organism/DosenForm.jsx";
import Swal from "sweetalert2";

const DaftarDosen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProdi, setSelectedProdi] = useState("");
  const [dosenList, setDosenList] = useState([]);
  const [prodiOptions, setProdiOptions] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchDosen = async () => {
    setIsLoading(true);
    try {
      const response = await getAllDosen();
      const dosenData = response.data;
      setDosenList(dosenData);

      const uniqueProdi = [...new Set(dosenData.map((dsn) => dsn.prodi))].map(
        (prodiName, index) => ({ id: index, nama: prodiName })
      );
      setProdiOptions(uniqueProdi);
    } catch (error) {
      console.error("Gagal memuat data dosen:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat memuat data dosen.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDosen();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data ini akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
      reverseButtons: true,
      customClass: {
        confirmButton:
          "bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded",
        cancelButton:
          "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-2",
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsDeleting(true);
        try {
          await deleteDosen(id);
          await fetchDosen();
          Swal.fire("Berhasil!", "Data dosen telah dihapus.", "success");
        } catch (error) {
          Swal.fire(
            "Gagal!",
            "Terjadi kesalahan saat menghapus data.",
            "error"
          );
          console.error("Error deleting dosen:", error);
        } finally {
          setIsDeleting(false);
        }
      } else {
        Swal.fire("Dibatalkan", "Data dosen tidak jadi dihapus.", "info");
      }
    });
  };

  const openModal = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };

  const filteredDosen = dosenList.filter((dsn) => {
    const matchesSearch =
      (dsn.nama && dsn.nama.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (dsn.nip && dsn.nip.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesProdi =
      selectedProdi === "" || (dsn.prodi && dsn.prodi === selectedProdi);

    return matchesSearch && matchesProdi;
  });

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
                {prodiOptions.map((prodi) => (
                  <option key={prodi.id} value={prodi.nama}>
                    {prodi.nama}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() =>
                openModal(
                  "Tambah Dosen",
                  <DosenForm
                    prodiList={prodiOptions}
                    onSubmit={async (data) => {
                      await storeDosen(data);
                      fetchDosen();
                      setIsModalOpen(false);
                      Swal.fire(
                        "Berhasil!",
                        "Dosen berhasil ditambahkan.",
                        "success"
                      );
                    }}
                    onCancel={() => setIsModalOpen(false)}
                  />
                )
              }
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center"
            >
              <FaUserPlus className="mr-2" />
              Tambah Dosen
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3">Nip</th>
                <th className="px-6 py-3">Nama</th>
                <th className="px-6 py-3">Prodi</th>
                <th className="px-6 py-3">Max SKS</th>
                <th className="px-6 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Memuat data dosen...
                  </td>
                </tr>
              ) : filteredDosen.length > 0 ? (
                filteredDosen.map((dsn) => (
                  <tr key={dsn.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {dsn.nip}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 mr-3 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-semibold">
                          {dsn.nama ? dsn.nama.charAt(0) : "N/A"}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {dsn.nama}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{dsn.prodi}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {dsn.max_sks}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() =>
                          openModal("Detail Dosen", <DetailDosen dsn={dsn} />)
                        }
                        className="text-blue-600 hover:text-blue-900 mr-3"
                        title="Lihat Detail"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() =>
                          openModal(
                            "Edit Dosen",
                            <DosenForm
                              initialData={dsn}
                              prodiList={prodiOptions}
                              onSubmit={async (data) => {
                                await updateDosen(dsn.id, data);
                                fetchDosen();
                                setIsModalOpen(false);
                                Swal.fire(
                                  "Berhasil!",
                                  "Data dosen berhasil diperbarui.",
                                  "success"
                                );
                              }}
                              onCancel={() => setIsModalOpen(false)}
                            />
                          )
                        }
                        className="text-yellow-600 hover:text-yellow-900 mr-3"
                        title="Edit Dosen"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(dsn.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Hapus Dosen"
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
                <span className="font-medium">{dosenList.length}</span> dosen
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
