import axios from "axios";

const API_URL = "http://localhost:3000/api/matkul";

export const getAllMatkul = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil data matkul:", error);
    throw error;
  }
};

export const addMatkul = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error("Gagal menambahkan matkul:", error);
    throw error;
  }
};

export const updateMatkul = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Gagal mengupdate matkul dengan ID ${id}:`, error);
    throw error;
  }
};

export const deleteMatkul = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Gagal menghapus matkul dengan ID ${id}:`, error);
    throw error;
  }
};
