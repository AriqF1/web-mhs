import { useState, useEffect } from "react";

const DosenForm = ({ initialData = null, prodiList, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nip: "",
    nama: "",
    prodi: "",
    max_sks: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nip: initialData.nip || "",
        nama: initialData.nama || "",
        prodi: initialData.prodi || "",
        max_sks: initialData.max_sks || "",
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
  };

  const isEdit = !!initialData?.id;

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
          className={
            `mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500
            ${isEdit ? "bg-gray-100 cursor-not-allowed" : ""}` // Added styling for disabled state
          }
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
        <label className="block text-sm font-medium text-gray-700">
          Program Studi
        </label>
        <select
          name="prodi"
          value={formData.prodi}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Pilih Prodi</option>
          {prodiList.map((prodiOption) => (
            <option key={prodiOption.id} value={prodiOption.nama}>
              {" "}
              {prodiOption.nama}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Max SKS
        </label>
        <input
          type="number"
          name="max_sks"
          value={formData.max_sks}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex justify-end pt-4 gap-2">
        <button
          type="button"
          onClick={onCancel}
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
