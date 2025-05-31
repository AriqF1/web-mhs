const StatusBadge = ({ status }) => {
  const color =
    status === "Aktif"
      ? "bg-green-100 text-green-800"
      : status === "Cuti"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-red-100 text-red-800";

  return (
    <span className={`px-2 py-1 text-xs rounded-full ${color}`}>{status}</span>
  );
};
export default StatusBadge;
