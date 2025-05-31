import React from "react";
import ListMahasiswa from "../../data/ListMahasiswa";
import ListDosen from "../../data/ListDosen";
import ListProdi from "../../data/ListProdi";
import DataMonitor from "../components/molecules/DataMonitor";
import DataDistribusi from "../components/DataDistribusi";

const dashboardData = [
  {
    id: 1,
    title: "Total Mahasiswa",
    value: ListMahasiswa.length,
    icon: "🎓",
    color: "#4F46E5", // biru
  },
  {
    id: 2,
    title: "Mahasiswa Aktif",
    value: ListMahasiswa.filter((mahasiswa) => mahasiswa.status === "Aktif")
      .length,
    icon: "✅",
    color: "#10B981", // hijau
  },
  {
    id: 3,
    title: "Mahasiswa Non Aktif",
    value: ListMahasiswa.filter((mahasiswa) => mahasiswa.status !== "Aktif")
      .length,
    icon: "❌",
    color: "#EF4444", // merah
  },
  {
    id: 4,
    title: "Jumlah Dosen",
    value: ListDosen.length,
    icon: "👨‍🏫",
    color: "#F59E0B", // oranye
  },
  {
    id: 5,
    title: "Jumlah Prodi",
    value: ListProdi.length,
    icon: "🏫",
    color: "#EC4899", // pink
  },
];

const DashboardPage = () => {
  return (
    <>
      <DataMonitor data={dashboardData} />
      <DataDistribusi data={ListProdi} />
    </>
  );
};

export default DashboardPage;
