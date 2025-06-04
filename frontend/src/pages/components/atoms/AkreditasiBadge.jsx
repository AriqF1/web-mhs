const AkreditasiBadge = ({ value }) => {
  const color =
    value === "A"
      ? "bg-green-100 text-green-800"
      : value === "B"
      ? "bg-blue-100 text-blue-800"
      : "bg-yellow-100 text-yellow-800";

  return (
    <span className={`px-2 py-0.5 text-xs rounded-full ${color}`}>
      Akreditasi {value}
    </span>
  );
};
export default AkreditasiBadge;
