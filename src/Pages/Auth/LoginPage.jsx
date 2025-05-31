import React from "react";
import { useState } from "react";
import Button from "../components/atoms/Button";
import Input from "../components/atoms/Input";
import Label from "../components/atoms/Label";
import { users } from "../../dummyData";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      console.log("Login berhasil:", user);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Login berhasil!");
      navigate("/admin/dashboard/index");
    } else {
      console.log("Login gagal: Email atau password salah.");
      toast.error("Login gagal: Email atau password salah.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Login</h2>
          <p className="mt-2 text-sm text-gray-600">Masuk ke dashboard Anda</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Masukkan email Anda"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Masukkan password Anda"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[35px] text-gray-500"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="remember-me"
                className="block ml-2 text-sm text-gray-700"
              >
                Ingat Saya
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Lupa Password
              </a>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full px-4 py-2.5 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
            >
              Login
            </Button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-600">
          Belum Punya Akun?{" "}
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            Daftar
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
