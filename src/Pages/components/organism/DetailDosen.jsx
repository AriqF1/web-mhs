import AvatarPlaceholder from "../atoms/AvatarPlaceholder";
import LabelValue from "../atoms/LabelValue";
import StatusBadge from "../atoms/StatusBadge";

const DetailDosen = ({ dsn }) => (
  <div className="space-y-4">
    <div className="flex justify-center mb-4">
      <AvatarPlaceholder text={dsn.nama} />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <LabelValue label="NIP" value={dsn.nip} />
      <LabelValue label="Nama" value={dsn.nama} />
      <LabelValue label="Email" value={dsn.email} />
      <LabelValue label="Prodi" value={dsn.prodi} />
      <div>
        <h4 className="text-sm font-medium text-gray-500">Status</h4>
        <StatusBadge status={dsn.status} />
      </div>
    </div>
  </div>
);
export default DetailDosen;
