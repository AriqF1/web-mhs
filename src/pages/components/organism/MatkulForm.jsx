import { useState, useEffect } from "react";

const MatkulForm = ({ initialData = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    id: "",
    nama: "",
    sks: 0,
  });

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setIsEdit(true);
    } else {
      setFormData({
        id: "",
        nama: "",
        sks: 0,
      });
      setIsEdit(false);
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "sks" ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.id || !formData.nama || formData.sks <= 0) {
      alert("ID, Nama Mata Kuliah, dan SKS harus diisi dengan benar.");
      return;
    }
    onSubmit(formData, isEdit);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="id" className="block text-sm font-medium text-gray-700">
          ID Mata Kuliah
        </label>
        <input
          type="text"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleInputChange}
          disabled={isEdit}
          className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
            isEdit ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
          required
        />
      </div>
      <div>
        <label
          htmlFor="nama"
          className="block text-sm font-medium text-gray-700"
        >
          Nama Mata Kuliah
        </label>
        <input
          type="text"
          id="nama"
          name="nama"
          value={formData.nama}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label
          htmlFor="sks"
          className="block text-sm font-medium text-gray-700"
        >
          Jumlah SKS
        </label>
        <input
          type="number"
          id="sks"
          name="sks"
          value={formData.sks}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          min="1"
          required
        />
      </div>

      <div className="flex justify-end pt-4 gap-2">
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
          {isEdit ? "Simpan Perubahan" : "Tambah Mata Kuliah"}
        </button>
      </div>
    </form>
  );
};

export default MatkulForm;
