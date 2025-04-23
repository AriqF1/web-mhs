import ListMahasiswa from "./ListMahasiswa";

const ListProdi = [
  {
    kode: "TI",
    nama: "Teknik Informatika",
    jenjang: "S1",
    akreditasi: "A",
    jumlahMahasiswa: ListMahasiswa.filter(
      (mahasiswa) => mahasiswa.jurusan === "Teknik Informatika"
    ).length,
  },
  {
    kode: "SI",
    nama: "Sistem Informasi",
    jenjang: "S1",
    akreditasi: "A",
    jumlahMahasiswa: ListMahasiswa.filter(
      (mahasiswa) => mahasiswa.jurusan === "Sistem Informasi"
    ).length,
  },
  {
    kode: "TK",
    nama: "Teknik Komputer",
    jenjang: "D3",
    akreditasi: "B",
    jumlahMahasiswa: ListMahasiswa.filter(
      (mahasiswa) => mahasiswa.jurusan === "Teknik Komputer"
    ).length,
  },
  {
    kode: "MI",
    nama: "Manajemen Informatika",
    jenjang: "D3",
    akreditasi: "B",
    jumlahMahasiswa: ListMahasiswa.filter(
      (mahasiswa) => mahasiswa.jurusan === "Manajemen Informatika"
    ).length,
  },
  {
    kode: "RPL",
    nama: "Rekayasa Perangkat Lunak",
    jenjang: "S1",
    akreditasi: "A",
    jumlahMahasiswa: ListMahasiswa.filter(
      (mahasiswa) => mahasiswa.jurusan === "Rekayasa Perangkat Lunak"
    ).length,
  },
];

export default ListProdi;
