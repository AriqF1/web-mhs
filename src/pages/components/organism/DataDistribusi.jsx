import ProdiCard from "../molecules/ProdiCard";

const DataDistribusi = ({ data }) => {
  const maxJumlah = Math.max(...data.map((p) => p.jumlahMahasiswa));

  return (
    <div className="mt-4 shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">
        Monitor Distribusi Mahasiswa
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((prodi) => (
          <ProdiCard key={prodi.kode} prodi={prodi} max={maxJumlah} />
        ))}
      </div>
    </div>
  );
};
export default DataDistribusi;
