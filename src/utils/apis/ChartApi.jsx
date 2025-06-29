import axios from "@/utils/AxiosInstance";

export const getAllChartData = () => axios.get("/chart");
