import React from "react";
import Footer from "../Layouts/Footer";
import Sidebar from "../Layouts/Sidebar";
import Header from "../Layouts/Header";

const Dashboard = () => {  
    return (
        <body className="h-screen bg-gray-200">
    <div className="flex h-screen">
            <Sidebar />
        <div className="flex flex-col flex-1">
            <Header />
            <main className="flex-1 p-6 overflow-auto">
                <div className="bg-white shadow rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Daftar Mahasiswa</h2>
                        <button onclick="openModal('addModal')" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                            + Tambah Mahasiswa
                        </button>
                    </div>
                    <table className="w-full text-sm text-gray-700">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th className="px-2 py-4 text-left">NIM</th>
                                <th className="px-2 py-4 text-left">Nama</th>
                                <th className="px-2 py-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="even:bg-gray-100 odd:bg-white">
                                <td className="px-2 py-4">2021001</td>
                                <td className="px-2 py-4">Andi</td>
                                <td className="px-2 py-4 text-center">
                                    <button onclick="openModal('editModal')" className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">Edit</button>
                                    <button onclick="deleteMahasiswa(this)" className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Hapus</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
            <Footer />
        </div>
    </div>
</body>
    )
};
export default Dashboard;