import React from "react";

const DetailMahasiswa = () => {  
    return (
        <main className="flex-1 p-6 overflow-auto">
        <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Detail Mahasiswa</h2>
                <button onclick="openModal('addModal')" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                    + Tambah Mahasiswa
                </button>
            </div>
            <table className="w-full text-sm text-gray-700">
                <thead>
                    <tr className="bg-blue-600 text-white">
                        <th className="px-2 py-4 text-left">NIM</th>
                        <th className="px-2 py-4 text-left">Nama</th>
                        <th className="px-2 py-4 text-left">Nama Ayah</th>
                        <th className="px-2 py-4 text-left">Nama Ibu</th>
                        <th className="px-2 py-4 text-left">Alamat</th>
                        <th className="px-2 py-4 text-left">Kota</th>
                        <th className="px-2 py-4 text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="even:bg-gray-100 odd:bg-white">
                        <td className="px-2 py-4">2021001</td>
                        <td className="px-2 py-4">Andi</td>
                        <td className="px-2 py-4">Rudi</td>
                        <td className="px-2 py-4">Siti</td>
                        <td className="px-2 py-4">Banjir Kanal</td>
                        <td className="px-2 py-4">Semarang</td>
                        <td className="px-2 py-4 text-center">
                            <button onclick="openModal('editModal')" className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">Edit</button>
                            <button onclick="deleteMahasiswa(this)" className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Hapus</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
    )
};
export default DetailMahasiswa;