import React from "react";
import { useState } from "react";
import Button from "./Components/Button";
import Input from "./Components/Input";
import Label from "./Components/Label";
import { users } from "../../dummyData";
import { useNavigate } from "react-router-dom";;

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: "", password: "",});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = users.find(u => u.email === formData.email && u.password === formData.password);
        
        if (user) {
            console.log("Login berhasil:", user);
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/admin/dashboard");
        } else {
            console.log("Login gagal: Email atau password salah.");
            alert("Username atau Password salah!");
        }
    };
    

    return (
        <div className="h-screen bg-gray-200 flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Login</h2>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <Label htmlFor="email" children={<span>Email</span>}/> 
                                <Input
                                type="email"
                                name="email"
                                placeholder="Masukkan Email"
                                value = {formData.email}
                                onChange={handleChange} />
                            </div>
                            <div>
                                <Label htmlFor="password" children={<span>Password</span>}/>
                                <Input
                                type="password"
                                name="password"
                                placeholder="Masukkan Password"
                                value={formData.password}
                                onChange={handleChange} />
                            </div>
                            <div className="flex justify-between items-center">
                                <label className="flex-item-center">
                                    <input type="checkbox" className="mr-2"/>
                                    <span className="text-sm text-gray-600">Ingat Saya</span>
                                </label>
                                <a href="#" className="text-sm text-blue-500 hover:underline">Lupa Password</a>
                            </div>
                            <Button>Login</Button>
                        </form>
                        <p className="text-sm text-center text-gray-600 mt-4">
                            Belum Punya Akun?<a href="#" className="text-blue-500 hover:underline"> Daftar</a>
                        </p>
                </div>
        </div>
    );


};
export default LoginPage;