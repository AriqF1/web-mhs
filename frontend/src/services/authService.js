import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error(
        "Token tidak valid atau kadaluarsa. Mengarahkan ke halaman login..."
      );

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

/**
 * Mengirim permintaan login ke backend.
 * @param {string} email - Email pengguna.
 * @param {string} password - Password pengguna.
 * @returns {Promise<Object>} Data respons dari backend (misalnya, { user, token }).
 * @throws {string} Pesan error jika login gagal.
 */
export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "Login gagal. Coba lagi.";
  }
};

/**
 * Mengirim permintaan registrasi ke backend.
 * @param {string} email - Email pengguna baru.
 * @param {string} password - Password untuk pengguna baru.
 * @returns {Promise<Object>} Data respons dari backend (misalnya, { message, user, token }).
 * @throws {string} Pesan error jika registrasi gagal.
 */
export const registerUser = async (email, password) => {
  try {
    const response = await api.post("/auth/register", { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "Registrasi gagal. Coba lagi.";
  }
};
