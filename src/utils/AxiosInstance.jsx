import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://localhost:3001", // alamat json-server
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosInstance;
