import axios from "@/Utils/AxiosInstance";

export const login = async (email, password) => {
  const res = await axios.get("/user", { params: { email } });
  const user = res.data[0];

  if (!user) throw new Error("Email tidak ditemukan");
  if (user.password !== password) throw new Error("Password salah");

  return user;
};
