import React, { useState } from "react";
import ListProdi from "../../data/ListProdi";
import DataProdi from "../components/DataProdi";

const DaftarProdi = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterJenjang, setFilterJenjang] = useState("");
  // Filter prodi berdasarkan pencarian dan jenjang
  const filteredProdi = ListProdi.filter((prodi) => {
    const matchesSearch =
      prodi.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prodi.kode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesJenjang =
      filterJenjang === "" || prodi.jenjang === filterJenjang;
    return matchesSearch && matchesJenjang;
  });

  return <DataProdi filteredProdi={filteredProdi} />;
};

export default DaftarProdi;
