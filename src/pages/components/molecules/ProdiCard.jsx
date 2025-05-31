import AkreditasiBadge from "../atoms/AkreditasiBadge";

const ProdiCard = ({ prodi, max }) => {
  return (
    <div className="mt-4 shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">
        Monitor Distribusi Mahasiswa
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((prodi) => (
          <div
            key={prodi.kode}
            className="bg-gray-50 p-4 rounded-lg border border-gray-200"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 mr-3 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-semibold">
                  {prodi.kode.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold">{prodi.nama}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">{prodi.jenjang}</span>
                    <AkreditasiBadge value={prodi.akreditasi} />
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  {prodi.jumlahMahasiswa}
                </div>
                <div className="text-xs text-gray-500">Mahasiswa</div>
              </div>
            </div>
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{
                    width: `${(prodi.jumlahMahasiswa / max) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProdiCard;
