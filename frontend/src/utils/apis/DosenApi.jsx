import axios from "@/utils/AxiosInstance";

// Ambil semua dosen
export const getAllDosen = () => axios.get("/dosen");

// Ambil 1 dosen
export const getDosen = (id) => axios.get(`/dosen/${id}`);

// Tambah dosen
export const storeDosen = (data) => axios.post("/dosen", data);

// Update dosen
export const updateDosen = (id, data) => axios.put(`/dosen/${id}`, data);

// Hapus dosen
export const deleteDosen = (id) => axios.delete(`/dosen/${id}`);
