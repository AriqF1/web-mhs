import axios from "@/utils/AxiosInstance";

// Ambil semua mata kuliah
export const getAllMataKuliah = () => axios.get("/matkul");

// Ambil satu mata kuliah
export const getMataKuliah = (id) => axios.get(`/matkul/${id}`);

// Tambah mata kuliah
export const storeMataKuliah = (data) => axios.post("/matkul", data);

// Update mata kuliah
export const updateMataKuliah = (id, data) => axios.put(`/matkul/${id}`, data);

// Hapus mata kuliah
export const deleteMataKuliah = (id) => axios.delete(`/matkul/${id}`);
