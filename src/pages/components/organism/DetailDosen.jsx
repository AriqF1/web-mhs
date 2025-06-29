import AvatarPlaceholder from "../atoms/AvatarPlaceholder";
import LabelValue from "../atoms/LabelValue";

const DetailDosen = ({ dsn }) => (
  <div className="space-y-4">
    <div className="flex justify-center mb-4">
      <AvatarPlaceholder text={dsn.nama} />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <LabelValue label="NIP" value={dsn.nip} />
      <LabelValue label="Nama" value={dsn.nama} />
      <LabelValue label="Prodi" value={dsn.prodi} />
      <LabelValue label="Max Sks" value={dsn.max_sks} />
    </div>
  </div>
);
export default DetailDosen;
