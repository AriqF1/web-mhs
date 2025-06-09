import axios from "axios";

const API_URL = "http://localhost:3000/api/dosen";

export const getAllDosen = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil data dosen:", error);
    throw error;
  }
};

export const addDosen = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error("Gagal menambahkan dosen:", error);
    throw error;
  }
};

export const updateDosen = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Gagal mengupdate dosen dengan ID ${id}:`, error);
    throw error;
  }
};

export const deleteDosen = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Gagal menghapus dosen dengan ID ${id}:`, error);
    throw error;
  }
};
