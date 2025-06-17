import React from "react";

const DetailMatakuliah = ({ matakuliah }) => {
  if (!matakuliah) {
    return (
      <p className="p-4 text-gray-700">
        Tidak ada data matakuliah untuk ditampilkan.
      </p>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Detail Matakuliah
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center border-b pb-2">
          <span className="text-gray-600 font-medium">Kode Matakuliah:</span>
          <span className="text-gray-800">{matakuliah.kode_matakuliah}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="text-gray-600 font-medium">Nama Matakuliah:</span>
          <span className="text-gray-800">{matakuliah.nama_matakuliah}</span>
        </div>
        <div className="flex justify-between items-center border-b pb-2">
          <span className="text-gray-600 font-medium">SKS:</span>
          <span className="text-gray-800">{matakuliah.sks}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Jurusan:</span>
          <span className="text-gray-800">
            {matakuliah.jurusan || "Tidak ada"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DetailMatakuliah;
