import AvatarPlaceholder from "../atoms/AvatarPlaceholder";
import LabelValue from "../atoms/LabelValue";
import StatusBadge from "../atoms/StatusBadge";

const DetailMahasiswa = ({ mhs }) => (
  <div className="space-y-4">
    <div className="flex justify-center mb-4">
      <AvatarPlaceholder text={mhs.nama} />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <LabelValue label="NIM" value={mhs.nim} />
      <LabelValue label="Nama" value={mhs.nama} />
      <LabelValue label="Email" value={mhs.email} />
      <LabelValue label="Jurusan" value={mhs.jurusan} />
      <LabelValue label="Angkatan" value={mhs.angkatan} />
      <div>
        <h4 className="text-sm font-medium text-gray-500">Status</h4>
        <StatusBadge status={mhs.status} />
      </div>
    </div>
  </div>
);
export default DetailMahasiswa;
