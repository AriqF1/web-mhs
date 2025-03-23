import React from 'react';
import Input from './Pages/Auth/Components/Input';

const App = () => { 
   return <div className="h-screen bg-gray-200 flex items-center justify-center">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Login</h2>
                <form id="loginForm" className="space-y-4" onSubmit="handleLogin(event)">
                    <div>
                        <label for="email" className="block text-sm font-medium text-gray-700">Email</label> 
                        <Input
                          type="email"
                          name="email"
                          placeholder="Masukkan Email"/>
                    </div>
                    <div>
                        <label for="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <Input
                          type="password"
                          name="password"
                          placeholder="Masukkan Password"/>
                    </div>
                    <div className="flex justify-between items-center">
                        <label className="flex-item-center">
                            <input type="checkbox" className="mr-2"/>
                            <span className="text-sm text-gray-600">Ingat Saya</span>
                        </label>
                        <a href="#" className="text-sm text-blue-500 hover:underline">Lupa Password</a>
                    </div>
                    <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        Login
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600 mt-4">
                    Belum Punya Akun?<a href="#" className="text-blue-500 hover:underline"> Daftar</a>
                </p>
        </div>
    </div>
}
export default App;