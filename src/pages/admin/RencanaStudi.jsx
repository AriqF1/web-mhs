import React, { useState, useEffect } from "react";
import Modal from "../components/organism/Modal.jsx";
import { FaEdit, FaTrash, FaPlus, FaUserPlus } from "react-icons/fa";
import { getAllDosen } from "../../utils/apis/DosenApi.jsx";
import {
  getAllKelas,
  storeKelas,
  updateKelas,
  deleteKelas,
} from "../../utils/apis/KelasApi.jsx";
import { getAllMataKuliah } from "../../utils/apis/MatkulApi.jsx";
import { getAllMahasiswa } from "../../utils/apis/MahasiswaApi.jsx";
import { useAuthStateContext } from "../../../AuthContext.jsx";
import {
  confirmDelete,
  toastSuccess,
  toastError,
} from "../../utils/utility.jsx";

const RencanaStudi = () => {
  const { user } = useAuthStateContext();
  const [kelas, setKelas] = useState([]);
  const [dosen, setDosen] = useState([]);
  const [mahasiswa, setMahasiswa] = useState([]);
  const [mataKuliah, setMataKuliah] = useState([]);

  const [selectedMhs, setSelectedMhs] = useState({});
  const [selectedDsn, setSelectedDsn] = useState({});

  const [form, setForm] = useState({ mata_kuliah_id: "", dosen_id: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resKelas, resDosen, resMahasiswa, resMataKuliah] =
        await Promise.all([
          getAllKelas(),
          getAllDosen(),
          getAllMahasiswa(),
          getAllMataKuliah(),
        ]);
      setKelas(resKelas.data);
      setDosen(resDosen.data);
      setMahasiswa(resMahasiswa.data);
      setMataKuliah(resMataKuliah.data);
    } catch (error) {
      toastError("Gagal mengambil data.");
      console.error("Error fetching data:", error);
    }
  };

  const mataKuliahSudahDipakai = kelas.map((k) => k.mata_kuliah_id);
  const mataKuliahBelumAdaKelas = mataKuliah.filter(
    (m) => !mataKuliahSudahDipakai.includes(m.id)
  );

  const getMaxSks = (id) => mahasiswa.find((m) => m.id === id)?.max_sks || 0;
  const getDosenMaxSks = (id) => dosen.find((d) => d.id === id)?.max_sks || 0;

  const handleDeleteMahasiswa = async (kelasItem, mhsId) => {
    try {
      const updated = {
        ...kelasItem,
        mahasiswa_ids: kelasItem.mahasiswa_ids.filter((id) => id !== mhsId),
      };

      await updateKelas(kelasItem.id, updated);
      toastSuccess("Mahasiswa dihapus dari kelas");
      fetchData();
    } catch (error) {
      toastError("Gagal menghapus mahasiswa.");
      console.error("Error deleting mahasiswa:", error);
    }
  };

  const handleAddMahasiswa = async (kelasItem, mhsId) => {
    if (!mhsId) {
      toastError("Pilih mahasiswa terlebih dahulu.");
      return;
    }
    try {
      const matkul = mataKuliah.find((m) => m.id === kelasItem.mata_kuliah_id);
      const sks = matkul?.sks || 0;

      const totalSksMahasiswa = kelas
        .filter((k) => k.mahasiswa_ids.includes(mhsId))
        .map((k) => mataKuliah.find((m) => m.id === k.mata_kuliah_id)?.sks || 0)
        .reduce((acc, curr) => acc + curr, 0);

      const maxSks = getMaxSks(mhsId);

      if (totalSksMahasiswa + sks > maxSks) {
        toastError(
          `SKS melebihi batas maksimal (${maxSks}) untuk mahasiswa ini.`
        );
        return;
      }

      if (kelasItem.mahasiswa_ids.includes(mhsId)) {
        toastError("Mahasiswa sudah terdaftar di kelas ini.");
        return;
      }

      const updated = {
        ...kelasItem,
        mahasiswa_ids: [...kelasItem.mahasiswa_ids, mhsId],
      };

      await updateKelas(kelasItem.id, updated);
      toastSuccess("Mahasiswa ditambahkan ke kelas");
      setSelectedMhs((prev) => ({ ...prev, [kelasItem.id]: "" }));
      fetchData();
    } catch (error) {
      toastError("Gagal menambahkan mahasiswa.");
      console.error("Error adding mahasiswa:", error);
    }
  };

  const handleChangeDosen = async (kelasItem) => {
    const dsnId = selectedDsn[kelasItem.id];
    if (!dsnId) {
      toastError("Pilih dosen terlebih dahulu.");
      return;
    }
    try {
      const totalSksDosen = kelas
        .filter((k) => k.dosen_id === dsnId)
        .map((k) => mataKuliah.find((m) => m.id === k.mata_kuliah_id)?.sks || 0)
        .reduce((acc, curr) => acc + curr, 0);

      const kelasSks =
        mataKuliah.find((m) => m.id === kelasItem.mata_kuliah_id)?.sks || 0;
      const maxSks = getDosenMaxSks(dsnId);

      if (totalSksDosen + kelasSks > maxSks) {
        toastError(
          `Dosen melebihi batas maksimal SKS (${maxSks}) untuk kelas yang diajarkan.`
        );
        return;
      }

      await updateKelas(kelasItem.id, { ...kelasItem, dosen_id: dsnId });
      toastSuccess("Dosen diperbarui untuk kelas ini");
      fetchData();
    } catch (error) {
      toastError("Gagal memperbarui dosen.");
      console.error("Error changing dosen:", error);
    }
  };

  const handleDeleteKelas = async (kelasId) => {
    confirmDelete(async () => {
      try {
        await deleteKelas(kelasId);
        toastSuccess("Kelas dihapus");
        fetchData();
      } catch (error) {
        toastError("Gagal menghapus kelas.");
        console.error("Error deleting kelas:", error);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.mata_kuliah_id || !form.dosen_id) {
      toastError("Form tidak lengkap. Pastikan Mata Kuliah dan Dosen dipilih.");
      return;
    }
    try {
      await storeKelas({ ...form, mahasiswa_ids: [] });
      setIsModalOpen(false);
      toastSuccess("Kelas berhasil ditambahkan");
      setForm({ mata_kuliah_id: "", dosen_id: "" });
      fetchData();
    } catch (error) {
      toastError("Gagal menambahkan kelas.");
      console.error("Error submitting new class:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openModal = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };

  const getDosenName = (id) =>
    dosen.find((d) => d.id === id)?.nama || "Tidak Ditemukan";
  const getMataKuliahName = (id) =>
    mataKuliah.find((m) => m.id === id)?.nama || "Tidak Ditemukan";
  const getMahasiswaName = (id) =>
    mahasiswa.find((m) => m.id === id)?.nama || "Tidak Ditemukan";

  return (
    <div className="flex-1 p-6 overflow-auto bg-gray-50">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Rencana Studi</h1>
        <p className="text-gray-600">Kelola Data Rencana Studi Dan Kelas</p>
      </div>

      <div className="bg-white shadow-xl rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Tambah Kelas Baru
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label
              htmlFor="mata_kuliah_id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mata Kuliah
            </label>
            <select
              id="mata_kuliah_id"
              name="mata_kuliah_id"
              value={form.mata_kuliah_id}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm cursor-pointer"
            >
              <option value="">Pilih Mata Kuliah</option>
              {mataKuliahBelumAdaKelas.map((mk) => (
                <option key={mk.id} value={mk.id}>
                  {mk.nama} ({mk.sks} SKS)
                </option>
              ))}
            </select>
            {mataKuliahBelumAdaKelas.length === 0 && (
              <p className="text-sm text-gray-500 mt-2">
                Semua mata kuliah sudah memiliki kelas.
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="dosen_id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Dosen Pengajar
            </label>
            <select
              id="dosen_id"
              name="dosen_id"
              value={form.dosen_id}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm cursor-pointer"
            >
              <option value="">Pilih Dosen</option>
              {dosen.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nama}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer"
            >
              <FaPlus className="mr-2 -ml-1" /> Tambah Kelas
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Daftar Kelas Aktif
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Lihat dan kelola kelas yang tersedia.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mata Kuliah
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKS
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dosen Pengajar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mahasiswa Terdaftar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {kelas.length > 0 ? (
                kelas.map((kls) => (
                  <tr key={kls.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {getMataKuliahName(kls.mata_kuliah_id)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {mataKuliah.find((m) => m.id === kls.mata_kuliah_id)
                        ?.sks || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center space-x-2">
                        <select
                          value={selectedDsn[kls.id] || kls.dosen_id}
                          onChange={(e) =>
                            setSelectedDsn((prev) => ({
                              ...prev,
                              [kls.id]: e.target.value,
                            }))
                          }
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                        >
                          {dosen.map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.nama}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => handleChangeDosen(kls)}
                          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                          title="Ganti Dosen"
                        >
                          <FaEdit />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <ul className="list-disc list-inside space-y-1 mb-2">
                        {kls.mahasiswa_ids && kls.mahasiswa_ids.length > 0 ? (
                          kls.mahasiswa_ids.map((mhsId) => (
                            <li
                              key={mhsId}
                              className="flex items-center justify-between"
                            >
                              {getMahasiswaName(mhsId)}
                              <button
                                onClick={() =>
                                  handleDeleteMahasiswa(kls, mhsId)
                                }
                                className="text-red-500 hover:text-red-700 ml-2 cursor-pointer"
                                title="Hapus Mahasiswa"
                              >
                                <FaTrash className="inline" />
                              </button>
                            </li>
                          ))
                        ) : (
                          <li>Belum ada mahasiswa terdaftar.</li>
                        )}
                      </ul>
                      <div className="flex items-center space-x-2 mt-3">
                        <select
                          value={selectedMhs[kls.id] || ""}
                          onChange={(e) =>
                            setSelectedMhs((prev) => ({
                              ...prev,
                              [kls.id]: e.target.value,
                            }))
                          }
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Tambah Mahasiswa</option>
                          {mahasiswa
                            .filter(
                              (mhs) => !kls.mahasiswa_ids.includes(mhs.id)
                            )
                            .map((mhs) => (
                              <option key={mhs.id} value={mhs.id}>
                                {mhs.nama} (SKS Max: {mhs.max_sks})
                              </option>
                            ))}
                        </select>
                        <button
                          onClick={() =>
                            handleAddMahasiswa(kls, selectedMhs[kls.id])
                          }
                          className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer"
                          title="Tambah Mahasiswa"
                        >
                          <FaUserPlus />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                      <button
                        onClick={() => handleDeleteKelas(kls.id)}
                        className="text-red-600 hover:text-red-900 cursor-pointer"
                        title="Hapus Kelas"
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
                    Tidak ada kelas yang ditemukan. Tambahkan kelas baru di
                    atas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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

export default RencanaStudi;
