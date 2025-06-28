import React, { useState, useMemo, useEffect } from "react";
import Modal from "../components/organism/Modal.jsx";
import { FaEdit, FaTrash, FaSearch, FaUserPlus, FaEye } from "react-icons/fa";
import MahasiswaForm from "../components/organism/MahasiswaForm.jsx";
import DetailMahasiswa from "../components/organism/DetailMahasiswa.jsx";
import Swal from "sweetalert2";

import {
  useMahasiswa,
  useStoreMahasiswa,
  useUpdateMahasiswa,
  useDeleteMahasiswa,
} from "../../utils/hooks/useMahasiswa.jsx";
import { useMatkul } from "../../utils/hooks/useMatkul.jsx";
import { useKelas } from "../../utils/hooks/useKelas.jsx";
import { useDebounce } from "../../utils/hooks/useDebounce.jsx";

const DaftarMahasiswa = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJurusan, setSelectedJurusan] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm, selectedJurusan]);

  const {
    data: result,
    isLoading: isLoadingMahasiswa,
    isError: isErrorMahasiswa,
    error: errorMahasiswa,
    isPreviousData,
  } = useMahasiswa({
    q: debouncedSearchTerm,
    jurusan: selectedJurusan || undefined,
    _sort: "nama",
    _order: "asc",
    _page: page,
    _limit: limit,
  });

  const {
    data: kelas = [],
    isLoading: isLoadingKelas,
    isError: isErrorKelas,
    error: errorKelas,
  } = useKelas();
  const {
    data: mataKuliah = [],
    isLoading: isLoadingMatkul,
    isError: isErrorMatkul,
    error: errorMatkul,
  } = useMatkul();

  const mahasiswa = result?.data ?? [];
  const totalCount = result?.total ?? 0;
  const totalPages = Math.ceil(totalCount / limit);

  const { mutate: storeMahasiswaMutate } = useStoreMahasiswa();
  const { mutate: updateMahasiswaMutate } = useUpdateMahasiswa();
  const { mutate: deleteMahasiswaMutate } = useDeleteMahasiswa();

  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => {
    if (!isPreviousData && page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const openModal = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const handleAddEditSubmit = (formData, isEdit) => {
    if (isEdit) {
      updateMahasiswaMutate({ id: formData.id, data: formData });
    } else {
      storeMahasiswaMutate(formData);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data ini akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMahasiswaMutate(id);
      }
    });
  };

  const enrichedMahasiswa = useMemo(() => {
    if (!mahasiswa.length || !kelas.length || !mataKuliah.length) return [];

    return mahasiswa.map((mhs) => {
      const uniqueMatkulIds = new Set();
      kelas.forEach((kls) => {
        if (kls.mahasiswa_ids.includes(String(mhs.id))) {
          uniqueMatkulIds.add(String(kls.mata_kuliah_id));
        }
      });
      const matkulDiambil = Array.from(uniqueMatkulIds).map((matkulId) => {
        const matkul = mataKuliah.find((mk) => String(mk.id) === matkulId);
        return matkul ? matkul.nama : "Tidak Diketahui";
      });
      return { ...mhs, matkulDiambil };
    });
  }, [mahasiswa, kelas, mataKuliah]);

  const { data: allMahasiswaForJurusan } = useMahasiswa({ _limit: 1000 });
  const uniqueJurusan = useMemo(
    () =>
      [
        ...new Set(
          (allMahasiswaForJurusan?.data ?? []).map((mhs) => mhs.jurusan)
        ),
      ].sort(),
    [allMahasiswaForJurusan]
  );

  const isInitialLoading =
    isLoadingMahasiswa || isLoadingKelas || isLoadingMatkul;

  if (isInitialLoading && !result) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center">
        <p className="text-gray-600 text-lg">Memuat data...</p>
      </div>
    );
  }

  if (isErrorMahasiswa || isErrorKelas || isErrorMatkul) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center text-red-500">
        <p>
          Error:{" "}
          {errorMahasiswa?.message ||
            errorKelas?.message ||
            errorMatkul?.message}
        </p>
      </div>
    );
  }

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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1 flex items-center gap-2">
              <div className="relative flex-grow">
                <FaSearch className="text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari NIM atau nama..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <select
                value={selectedJurusan}
                onChange={(e) => {
                  setSelectedJurusan(e.target.value);
                }}
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
                    onSubmit={(data) => handleAddEditSubmit(data, false)}
                    onCancel={closeModal}
                    uniqueJurusan={uniqueJurusan}
                    mataKuliahOptions={mataKuliah}
                  />
                )
              }
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center whitespace-nowrap"
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
                <th className="px-6 py-3">Mata Kuliah Diambil</th>
                <th className="px-6 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody
              className="bg-white divide-y divide-gray-200"
              style={{ opacity: isPreviousData ? 0.7 : 1 }}
            >
              {enrichedMahasiswa.length > 0 ? (
                enrichedMahasiswa.map((mhs) => (
                  <tr key={mhs.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {mhs.nim}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 mr-3 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-semibold">
                          {mhs.nama.charAt(0)}
                        </div>
                        <div className="font-medium text-gray-900">
                          {mhs.nama}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {mhs.jurusan}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {mhs.matkulDiambil && mhs.matkulDiambil.length > 0 ? (
                        <ul className="list-disc list-inside space-y-1">
                          {mhs.matkulDiambil.map((mk, index) => (
                            <li key={index}>{mk}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-gray-500">Belum ada</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() =>
                          openModal(
                            "Detail Mahasiswa",
                            <DetailMahasiswa
                              mhs={mhs}
                              matkulData={mataKuliah}
                            />
                          )
                        }
                        className="text-blue-600 hover:text-blue-900 mr-3"
                        title="Lihat Detail"
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
                              onSubmit={(data) =>
                                handleAddEditSubmit(data, true)
                              }
                              onCancel={closeModal}
                              mataKuliahOptions={mataKuliah}
                            />
                          )
                        }
                        className="text-yellow-600 hover:text-yellow-900 mr-3"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(mhs.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Hapus"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    {debouncedSearchTerm || selectedJurusan
                      ? "Tidak ada mahasiswa yang cocok dengan kriteria."
                      : "Tidak ada data mahasiswa."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={page >= totalPages || isPreviousData}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Menampilkan{" "}
                <span className="font-medium">
                  {totalCount > 0 ? (page - 1) * limit + 1 : 0}
                </span>{" "}
                sampai{" "}
                <span className="font-medium">
                  {Math.min(page * limit, totalCount)}
                </span>{" "}
                dari <span className="font-medium">{totalCount}</span> hasil
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  &laquo;
                </button>
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  Halaman {page} / {totalPages || 1}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={page >= totalPages || isPreviousData}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  &raquo;
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

export default DaftarMahasiswa;
