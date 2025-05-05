import React, { useState } from "react";
import Modal from "../Auth/Components/Modal";
import { FaEdit, FaTrash, FaSearch, FaUserPlus, FaEye } from "react-icons/fa";
import ListMahasiswaData from "../../data/ListMahasiswa.jsx";
import MahasiswaForm from "../Auth/Components/MahasiswaForm.jsx";
import Swal from "sweetalert2";

const DaftarMahasiswa = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJurusan, setSelectedJurusan] = useState("");
  const [ListMahasiswa, setListMahasiswa] = useState(ListMahasiswaData);

  // Fungsi untuk membuka modal
  const openModal = (title, content) => {
    console.log("Modal dibuka dengan title:", title);
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleDelete = (nim) => {
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
        setListMahasiswa((prev) => prev.filter((mhs) => mhs.nim !== nim));
        Swal.fire("Dihapus!", "Data telah dihapus.", "success");
      } else {
        Swal.fire("Dibatalkan", "Data tidak dihapus", "info");
      }
    });
  };

  // Filter mahasiswa berdasarkan pencarian dan jurusan
  const filteredMahasiswa = ListMahasiswa.filter((mhs) => {
    const matchesSearch =
      mhs.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mhs.nim.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesJurusan =
      selectedJurusan === "" || mhs.jurusan === selectedJurusan;
    return matchesSearch && matchesJurusan;
  });

  // Ekstrak jurusan unik untuk dropdown filter
  const uniqueJurusan = [...new Set(ListMahasiswa.map((mhs) => mhs.jurusan))];

  // Render detail mahasiswa
  const DetailMahasiswa = ({ mhs }) => (
    <div className="space-y-4">
      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-4xl text-gray-500">
          {mhs.nama.charAt(0)}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500">NIM</h4>
          <p>{mhs.nim}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Nama</h4>
          <p>{mhs.nama}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Email</h4>
          <p>{mhs.email}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Jurusan</h4>
          <p>{mhs.jurusan}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Angkatan</h4>
          <p>{mhs.angkatan}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Status</h4>
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              mhs.status === "Aktif"
                ? "bg-green-100 text-green-800"
                : mhs.status === "Cuti"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {mhs.status}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 p-6 overflow-auto bg-gray-50">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Daftar Mahasiswa</h1>
        <p className="text-gray-600">
          Kelola data mahasiswa aktif dan tidak aktif
        </p>
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
                  placeholder="Cari NIM atau nama..."
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
                  "Tambah Mahasiswa",
                  <MahasiswaForm
                    uniqueJurusan={uniqueJurusan}
                    onSubmit={(data) =>
                      setListMahasiswa([...ListMahasiswa, data])
                    }
                    onCancel={() => setIsModalOpen(false)}
                  />
                )
              }
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center"
            >
              <FaUserPlus className="mr-2" />
              Tambah Mahasiswa
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3">NIM</th>
                <th className="px-6 py-3">Nama</th>
                <th className="px-6 py-3">Jurusan</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMahasiswa.length > 0 ? (
                filteredMahasiswa.map((mhs) => (
                  <tr key={mhs.nim} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {mhs.nim}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 mr-3 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-semibold">
                          {mhs.nama.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {mhs.nama}
                          </div>
                          <div className="text-sm text-gray-500">
                            {mhs.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {mhs.jurusan}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          mhs.status === "Aktif"
                            ? "bg-green-100 text-green-800"
                            : mhs.status === "Cuti"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {mhs.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() =>
                          openModal(
                            "Detail Mahasiswa",
                            <DetailMahasiswa mhs={mhs} />
                          )
                        }
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() =>
                          openModal(
                            "Edit Mahasiswa",
                            <MahasiswaForm
                              initialData={mhs}
                              uniqueJurusan={uniqueJurusan}
                              onSubmit={(data) => {
                                setListMahasiswa((prev) =>
                                  prev.map((m) =>
                                    m.nim === data.nim ? data : m
                                  )
                                );
                                closeModal();
                              }}
                              onDelete={(nim) => {
                                setListMahasiswa((prev) =>
                                  prev.filter((m) => m.nim !== nim)
                                );
                                closeModal();
                              }}
                              onCancel={setIsModalOpen(false)}
                            />
                          )
                        }
                        className="text-yellow-600 hover:text-yellow-900 mr-3"
                      >
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(mhs.nim)}>
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
                    Tidak ada data mahasiswa yang sesuai dengan pencarian
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
                <span className="font-medium">{filteredMahasiswa.length}</span>{" "}
                dari <span className="font-medium">{ListMahasiswa.length}</span>{" "}
                mahasiswa
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

export default DaftarMahasiswa;
