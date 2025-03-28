import React from "react";

const DetailMahasiswa = () => {  
    const ListMahasiswa = [
        { nim: "2021001", nama: "Andi", namaAyah: "Rudi", namaIbu: "Siti", alamat: "Banjir Kanal", kota: "Semarang" },
        { nim: "2021002", nama: "Budi" , namaAyah: "Joko", namaIbu: "Ani", alamat: "Jalan Merdeka", kota: "Jakarta" },
        { nim: "2021003", nama: "Cindy", namaAyah: "Slamet", namaIbu: "Dewi", alamat: "Jalan Sudirman", kota: "Bandung" },
        { nim: "2021004", nama: "Diana" , namaAyah: "Badang", namaIbu: "Sintia", alamat: "Jalan Pahlawan", kota: "Yogyakarta" },
        { nim: "2021005", nama: "Eko" , namaAyah: "Sukri", namaIbu: "Rina", alamat: "Jalan Diponegoro 4", kota: "Surabaya" },
        { nim: "2021006", nama: "Fani" , namaAyah: "Sumo", namaIbu: "Rina", alamat: "Jalan Diponegoro 5", kota: "Surabaya" },
    ];

    return (
        <main className="flex-1 p-6 overflow-auto">
        <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Detail Mahasiswa</h2>
                <button onClick="openModal('addModal')" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
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
                    {ListMahasiswa.map((mhs) => (
                    <tr className="even:bg-gray-100 odd:bg-white">
                        <td className="px-2 py-4">{mhs.nim}</td>
                        <td className="px-2 py-4">{mhs.nama}</td>
                        <td className="px-2 py-4">{mhs.namaAyah}</td>
                        <td className="px-2 py-4">{mhs.namaIbu}</td>
                        <td className="px-2 py-4">{mhs.alamat}</td>
                        <td className="px-2 py-4">{mhs.kota}</td>
                        <td className="px-2 py-4 text-center">
                            <button onClick="openModal('editModal')" className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">Edit</button>
                            <button onClick="deleteMahasiswa(this)" className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Hapus</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </main>
    )
};
export default DetailMahasiswa;