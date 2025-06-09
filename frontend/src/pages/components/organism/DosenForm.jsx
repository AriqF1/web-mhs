import { useState, useEffect } from "react";

const DosenForm = ({
  initialData = null,
  prodiList,
  onSubmit,
  onDelete,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    nip: "",
    nama: "",
    email: "",
    prodi_id: "",
    status: "Aktif",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nip: initialData.nip || "",
        nama: initialData.nama || "",
        email: initialData.email || "",
        prodi_id: initialData.prodi_id || "",
        status: initialData.status || "Aktif",
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
    if (onCancel) onCancel();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  const handleDelete = () => {
    if (onDelete) onDelete(formData.nip);
  };

  const isEdit = !!initialData?.nip;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">NIP</label>
        <input
          type="text"
          name="nip"
          value={formData.nip}
          onChange={handleInputChange}
          disabled={isEdit}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
          Program Studi
        </label>
        <select
          name="prodi_id"
          value={formData.prodi_id}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Pilih Prodi</option>
          {prodiList.map((prodi) => (
            <option key={prodi.id} value={prodi.id}>
              {prodi.nama}
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

export default DosenForm;
