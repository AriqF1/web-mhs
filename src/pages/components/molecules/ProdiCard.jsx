import AkreditasiBadge from "../atoms/AkreditasiBadge";

const ProdiCard = ({ prodi, max }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow">
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
  );
};

export default ProdiCard;
