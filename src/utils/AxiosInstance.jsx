import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://web-mhs-api.glitch.me",
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosInstance;
