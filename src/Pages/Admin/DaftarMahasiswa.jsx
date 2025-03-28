import React, { useState } from "react";
import Modal from "../Auth/Components/Modal";

const DaftarMahasiswa = () => {
    const ListMahasiswa = [
        { nim: "2021001", nama: "Andi" },
        { nim: "2021002", nama: "Budi" },
        { nim: "2021003", nama: "Cindy" },
        { nim: "2021004", nama: "Diana" },
        { nim: "2021005", nama: "Eko" },
        { nim: "2021006", nama: "Fani" },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // Fungsi untuk membuka modal
    const openModal = (title, content) => {
        console.log("Modal dibuka dengan title:", title);
        setModalTitle(title);
        setModalContent(content);
        setIsModalOpen(true);
    };

    return (
        <div className="flex-1 p-6 overflow-auto">
            <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">List Mahasiswa</h2>
                    <button
                        onClick={() => openModal("Tambah Mahasiswa", <p>Form Tambah Mahasiswa</p>)}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
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
                        {ListMahasiswa.map((mhs) => (
                            <tr key={mhs.nim} className="even:bg-gray-100 odd:bg-white">
                                <td className="px-2 py-4">{mhs.nim}</td>
                                <td className="px-2 py-4">{mhs.nama}</td>
                                <td className="px-2 py-4 text-center">
                                    <button
                                        onClick={() => openModal("Edit Mahasiswa", <p>Edit data {mhs.nama}</p>)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => openModal("Hapus Mahasiswa", <p>Yakin ingin menghapus {mhs.nama}?</p>)}
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalTitle}>
                {modalContent}
            </Modal>
        </div>
    );
};

export default DaftarMahasiswa;
