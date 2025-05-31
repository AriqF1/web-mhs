import { useState, useEffect } from "react";

const MahasiswaForm = ({
  initialData = null,
  uniqueJurusan,
  onSubmit,
  onDelete,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    nim: "",
    nama: "",
    email: "",
    jurusan: "",
    angkatan: "",
    status: "Aktif",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  const handleDelete = () => {
    if (onDelete) onDelete(formData.nim);
  };

  const isEdit = !!initialData;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">NIM</label>
        <input
          type="text"
          name="nim"
          value={formData.nim}
          onChange={handleInputChange}
          disabled={isEdit}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nama Lengkap
        </label>
        <input
          type="text"
          name="nama"
          value={formData.nama}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Jurusan
        </label>
        <select
          name="jurusan"
          value={formData.jurusan}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Pilih Jurusan</option>
          {uniqueJurusan.map((jurusan) => (
            <option key={jurusan} value={jurusan}>
              {jurusan}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="Aktif">Aktif</option>
          <option value="Cuti">Cuti</option>
          <option value="Tidak Aktif">Tidak Aktif</option>
        </select>
      </div>
      <div className="flex justify-end pt-4 gap-2">
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Hapus
          </button>
        )}
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          Batal
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Simpan
        </button>
      </div>
    </form>
  );
};

export default MahasiswaForm;
